import { useEffect, useState } from 'react';

const ITEMS=[
  ['top','00','Kirish'],
  ['platform','01','Interfeys'],
  ['products','02','Industriyalar'],
  ['ai','03','ZENIX AI'],
  ['features','04','Tizim'],
  ['pricing','05','Tarif'],
  ['contact','06','Aloqa'],
];

export default function ExperienceRail(){
  const [active,setActive]=useState('top');
  useEffect(()=>{
    const nodes=ITEMS.map(([id])=>document.getElementById(id)).filter(Boolean);
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(visible?.target?.id)setActive(visible.target.id);
    },{rootMargin:'-35% 0px -52% 0px',threshold:[0,.1,.4,.8]});
    nodes.forEach(node=>observer.observe(node));
    return()=>observer.disconnect();
  },[]);
  return <nav className="experience-rail" aria-label="Sahifa bo‘limlari">{ITEMS.map(([id,no,label])=><a key={id} className={active===id?'active':''} href={`#${id}`} aria-label={label}><span>{no}</span><i/><em>{label}</em></a>)}</nav>;
}
