import { useState } from 'react';
import { BarChart3, Boxes, ShoppingCart, Smartphone } from 'lucide-react';
import Reveal from '../Reveal/Reveal';
import SectionHeading from '../SectionHeading/SectionHeading';
import './PlatformShowcase.scss';

const TABS=[
  {name:'Dashboard',src:'/assets/screenshots/dashboard-desktop.webp',mobile:'/assets/screenshots/dashboard-mobile.webp',icon:BarChart3,caption:'Savdo, foyda, ombor qiymati va muhim signallar bir ekranda.'},
  {name:'Savdo',src:'/assets/screenshots/pos-desktop.webp',mobile:null,icon:ShoppingCart,caption:'Mahsulot qidirish, savat va to‘lov oqimi kassir uchun bitta ish maydonida.'},
  {name:'Mahsulotlar',src:'/assets/screenshots/products-desktop.webp',mobile:null,icon:Boxes,caption:'Katalog, qoldiq va kirim jarayonlari bir xil vizual tartibda.'},
  {name:'Analitika',src:'/assets/screenshots/analytics-desktop.webp',mobile:'/assets/screenshots/seller-mobile.webp',icon:Smartphone,caption:'Davr, filial va sotuvchi kesimida raqamlarni solishtirish.'},
];

export default function PlatformShowcase(){
  const [active,setActive]=useState(0);
  const current=TABS[active];

  return <section className="platform-showcase section" id="platform">
    <div className="shell">
      <Reveal><SectionHeading kicker="Real ZENIX Savdo interfeysi" title="Reklama maketi emas. Ishlayotgan mahsulotning o‘zi." text="ZENIX’ning vizual tili real platformadan keladi: qora fon, sokin qatlamlar, katta raqamlar va foydalanuvchini chalg‘itmaydigan boshqaruv."/></Reveal>

      <Reveal delay={70} className="showcase-tabs" as="div">
        {TABS.map((tab,index)=>{const Icon=tab.icon;return <button key={tab.name} type="button" className={active===index?'active':''} aria-pressed={active===index} onClick={()=>setActive(index)}><Icon size={17}/>{tab.name}</button>})}
      </Reveal>

      <Reveal delay={105} className={`showcase-layout ${current.mobile?'has-mobile':''}`}>
        <div className="showcase-browser">
          <div className="showcase-browser__bar"><span/><span/><span/><p>zenixpos.uz</p><strong>ZENIX Savdo</strong></div>
          <div className="showcase-browser__screen"><img key={current.src} src={current.src} alt={`ZENIX Savdo — ${current.name}`} decoding="async"/></div>
        </div>
        {current.mobile&&<div className="showcase-phone" aria-label="ZENIX mobil interfeysi">
          <div className="showcase-phone__frame"><span className="showcase-phone__speaker"/><img key={current.mobile} src={current.mobile} alt={`ZENIX mobil — ${current.name}`} loading="lazy" decoding="async"/><span className="showcase-phone__home"/></div>
        </div>}
      </Reveal>

      <Reveal delay={135} className="showcase-caption">
        <div><strong>{current.name}</strong><p>{current.caption}</p></div>
        <span>Desktop va mobil web</span>
      </Reveal>
    </div>
  </section>;
}
