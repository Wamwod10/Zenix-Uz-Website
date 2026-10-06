import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, BrainCircuit, Layers3, Mail, MessageCircle, Network } from 'lucide-react';
import Reveal from '../Reveal/Reveal';
import './Investor.scss';

const POINTS=[
  {icon:Layers3,title:'6 vertikal',text:'Har biri o‘z biznes logikasiga ega alohida mahsulot.'},
  {icon:Network,title:'Bitta product language',text:'Bir xil sifat standarti, interfeys mantig‘i va web arxitektura.'},
  {icon:BrainCircuit,title:'ZENIX AI qatlam',text:'Tahlil, savol-javob va ruxsat etilgan amallarni tezlashtiruvchi umumiy yo‘nalish.'},
];

export default function Investor(){
  const [open,setOpen]=useState(false);
  const wrapRef=useRef(null);

  useEffect(()=>{
    const onPointer=(event)=>{if(!wrapRef.current?.contains(event.target))setOpen(false)};
    const onKey=(event)=>event.key==='Escape'&&setOpen(false);
    document.addEventListener('pointerdown',onPointer);
    document.addEventListener('keydown',onKey);
    return()=>{document.removeEventListener('pointerdown',onPointer);document.removeEventListener('keydown',onKey)};
  },[]);

  return <section className="investor section" id="investors">
    <div className="shell">
      <Reveal className="investor-card">
        <div className="investor-copy">
          <span className="investor-kicker">Investorlar uchun</span>
          <h2>Bir brend ostida oltita alohida biznes tizimi.</h2>
          <p>ZENIX’ning modeli bitta dasturni turli nom bilan takrorlash emas. Har bir vertikal o‘z jarayonlari va foydalanuvchi rollariga ega mahsulot sifatida quriladi; ularni birlashtiradigan narsa umumiy texnologik standart, premium product language va ZENIX AI yondashuvi.</p>
          <p>Fokus — O‘zbekiston bozori. Savdo, ta’lim, ishlab chiqarish, ovqatlanish, mehmonxona va dorixona kabi kundalik operatsiyasi katta bo‘lgan sohalarda boshqaruvni zamonaviy web platformaga ko‘chirish maqsad qilingan.</p>
        </div>

        <div className="investor-points">{POINTS.map(item=>{const Icon=item.icon;return <div key={item.title}><span><Icon size={20}/></span><strong>{item.title}</strong><p>{item.text}</p></div>})}</div>

        <div className="investor-contact-wrap" ref={wrapRef}>
          <button type="button" className="button button--ghost" aria-expanded={open} aria-controls="investor-contact-pop" onClick={()=>setOpen(v=>!v)}>Investorlar uchun bog‘lanish <ArrowUpRight size={17}/></button>
          {open&&<div className="investor-contact-pop" id="investor-contact-pop">
            <a href="https://t.me/freemustafa" target="_blank" rel="noreferrer"><MessageCircle size={18}/><span><strong>Telegram</strong><small>Shaxsiy investor kontakti</small></span><ArrowUpRight size={15}/></a>
            <a href="mailto:shamshodochilov160@gmail.com"><Mail size={18}/><span><strong>Email</strong><small>Email orqali bog‘lanish</small></span><ArrowUpRight size={15}/></a>
          </div>}
        </div>
      </Reveal>
    </div>
  </section>;
}
