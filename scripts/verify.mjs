import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(here,'..');
const projectRoot=path.resolve(root,'..');

const required=[
  'index.html','src/main.jsx','src/App.jsx','src/styles/global.scss',
  'public/favicon.svg','public/icon-192.png','public/icon-512.png','public/og-zenix.jpg',
  'public/assets/screenshots/dashboard-desktop.webp','public/assets/screenshots/pos-desktop.webp',
  'public/assets/screenshots/products-desktop.webp','public/assets/screenshots/analytics-desktop.webp',
  'public/assets/screenshots/dashboard-mobile.webp','public/assets/screenshots/seller-mobile.webp',
];

const fail=(title,items=[])=>{
  console.error(`\n${title}`);
  items.forEach(item=>console.error(`- ${item}`));
  process.exitCode=1;
};

const missing=required.filter(item=>!fs.existsSync(path.join(root,item)));
if(missing.length)fail('Missing critical files:',missing);
const empty=required.filter(item=>fs.existsSync(path.join(root,item))&&fs.statSync(path.join(root,item)).size===0);
if(empty.length)fail('Unexpected empty critical files:',empty);

const walk=(dir,exts)=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{
  const full=path.join(dir,entry.name);
  if(entry.isDirectory())return walk(full,exts);
  return exts.some(ext=>entry.name.endsWith(ext))?[full]:[];
});

const sources=walk(path.join(root,'src'),['.js','.jsx','.scss']);
const styles=sources.filter(file=>file.endsWith('.scss'));
const scripts=sources.filter(file=>file.endsWith('.js')||file.endsWith('.jsx'));

const deprecatedImports=styles.filter(file=>/^\s*@import\s/m.test(fs.readFileSync(file,'utf8'))).map(file=>path.relative(root,file));
if(deprecatedImports.length)fail('Deprecated Sass @import found:',deprecatedImports);

const tinyFonts=[];
for(const file of styles){
  const text=fs.readFileSync(file,'utf8');
  for(const match of text.matchAll(/font-size\s*:\s*([\d.]+)px/g)){
    if(Number(match[1])<12)tinyFonts.push(`${path.relative(root,file)} -> ${match[1]}px`);
  }
}
if(tinyFonts.length)fail('Font sizes below 12px found:',tinyFonts);

const allowedBreakpoints=new Set(['1180','960','760','520']);
const badBreakpoints=[];
for(const file of styles){
  const text=fs.readFileSync(file,'utf8');
  for(const match of text.matchAll(/@media\(max-width:(\d+)px\)/g)){
    if(!allowedBreakpoints.has(match[1]))badBreakpoints.push(`${path.relative(root,file)} -> ${match[1]}px`);
  }
}
if(badBreakpoints.length)fail('Unexpected responsive breakpoints:',badBreakpoints);

const localImportErrors=[];
for(const file of scripts){
  const text=fs.readFileSync(file,'utf8');
  for(const match of text.matchAll(/from\s+['"](\.{1,2}\/[^'"]+)['"]/g)){
    const base=path.resolve(path.dirname(file),match[1]);
    const candidates=[base,`${base}.js`,`${base}.jsx`,`${base}.scss`,path.join(base,'index.js'),path.join(base,'index.jsx')];
    if(!candidates.some(candidate=>fs.existsSync(candidate)))localImportErrors.push(`${path.relative(root,file)} -> ${match[1]}`);
  }
}
if(localImportErrors.length)fail('Broken local imports:',localImportErrors);

const removedConcepts=['CursorFX','ExperienceRail','SignalRail','MobileActionBar'];
const appText=fs.readFileSync(path.join(root,'src/App.jsx'),'utf8');
const stale=removedConcepts.filter(name=>appText.includes(name));
if(stale.length)fail('Removed visual-noise components are still mounted:',stale);

const backendDir=path.join(projectRoot,'backend');
if(fs.existsSync(backendDir)){
  const backendFiles=walk(backendDir,['.js','.json','.env','.example','.gitignore']);
  const nonEmpty=backendFiles.filter(file=>fs.statSync(file).size>0).map(file=>path.relative(projectRoot,file));
  if(nonEmpty.length)fail('Backend must stay code-empty for this phase:',nonEmpty);
}

if(process.exitCode)process.exit(process.exitCode);
console.log(`ZENIX verification OK · ${required.length} critical files · ${scripts.length} JS/JSX files · ${styles.length} SCSS files.`);
