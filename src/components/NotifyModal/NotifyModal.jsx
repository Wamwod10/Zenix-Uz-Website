import { useEffect, useMemo, useRef, useState } from 'react';
import { BellRing, CheckCircle2, Mail, Phone, X } from 'lucide-react';
import { composeEmailUrl, deliverLead } from '../../utils/leadDelivery';
import { trackEvent } from '../../utils/analytics';
import './NotifyModal.scss';

const digits=(value)=>value.replace(/\D/g,'');

export default function NotifyModal({product,onClose}){
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  const [error,setError]=useState('');
  const [status,setStatus]=useState('idle');
  const dialogRef=useRef(null);
  const firstInputRef=useRef(null);

  useEffect(()=>{
    if(!product)return undefined;
    setName('');setPhone('');setError('');setStatus('idle');
    const previous=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const id=window.setTimeout(()=>firstInputRef.current?.focus(),0);
    const onKey=(event)=>{
      if(event.key==='Escape'){onClose();return}
      if(event.key!=='Tab')return;
      const focusable=[...dialogRef.current?.querySelectorAll('button:not([disabled]),a[href],input:not([disabled])')||[]];
      if(!focusable.length)return;
      const first=focusable[0];
      const last=focusable[focusable.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
    };
    window.addEventListener('keydown',onKey);
    return()=>{window.clearTimeout(id);document.body.style.overflow=previous;window.removeEventListener('keydown',onKey)};
  },[product,onClose]);

  const emailUrl=useMemo(()=>product?composeEmailUrl({
    subject:`${product.name} — tayyor bo‘lganda xabar bering`,
    body:`${product.name} tayyor bo‘lganda menga xabar bering.\n\nIsm: ${name||'—'}\nTelefon: ${phone||'—'}`,
  }):'#',[product,name,phone]);

  const submit=async(event)=>{
    event.preventDefault();
    if(digits(phone).length<9){setError('Telefon raqamini to‘liq kiriting.');return}
    setError('');setStatus('sending');
    trackEvent('waitlist_submit',{product:product.id});
    try{
      const result=await deliverLead({type:'waitlist',product:product.id,productName:product.name,name,phone,createdAt:new Date().toISOString()});
      if(result.delivered){setStatus('sent');return}
      setStatus('fallback');
    }catch{
      setStatus('fallback');
    }
  };

  if(!product)return null;
  const Icon=product.icon;
  return <div className="notify-backdrop" onMouseDown={event=>event.target===event.currentTarget&&onClose()}>
    <div className="notify-modal" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="notify-title">
      <button type="button" className="notify-close" onClick={onClose} aria-label="Yopish"><X size={20}/></button>
      <div className="notify-icon"><Icon size={24}/></div>
      <span className="notify-kicker">Tez kunda</span>
      <h3 id="notify-title">{product.name}</h3>
      <p>{product.tagline} Tayyor bo‘lganda sizga xabar berishimiz uchun kontakt qoldiring.</p>

      <form onSubmit={submit} className="notify-form" noValidate>
        <label className="notify-field"><span>Ism</span><input ref={firstInputRef} value={name} onChange={e=>{setName(e.target.value);setStatus('idle')}} placeholder="Ixtiyoriy" autoComplete="name"/></label>
        <label className="notify-field"><span>Telefon *</span><div><Phone size={17}/><input value={phone} onChange={e=>{setPhone(e.target.value);setError('');setStatus('idle')}} placeholder="+998 90 123 45 67" inputMode="tel" autoComplete="tel"/></div></label>
        {error&&<div className="notify-message error" role="alert">{error}</div>}
        {status==='sent'&&<div className="notify-message success"><CheckCircle2 size={16}/> So‘rov qabul qilindi. Mahsulot tayyor bo‘lganda bog‘lanamiz.</div>}
        {status==='fallback'&&<div className="notify-fallback"><div><strong>Kontakt tayyor.</strong><span>Email orqali yuborishni davom ettiring.</span></div><a href={emailUrl}><Mail size={16}/> Email orqali yuborish</a></div>}
        <button className="button button--primary notify-send" type="submit" disabled={status==='sending'}><BellRing size={18}/>{status==='sending'?'Yuborilmoqda...':'Menga xabar bering'}</button>
      </form>
    </div>
  </div>;
}
