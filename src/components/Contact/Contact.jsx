import { useMemo, useState } from 'react';
import { ArrowUpRight, CheckCircle2, Instagram, Mail, MessageCircle, Phone, Send } from 'lucide-react';
import { PRODUCTS } from '../../data/siteData';
import { composeEmailUrl, deliverLead, EMAIL, GENERAL_TELEGRAM_URL } from '../../utils/leadDelivery';
import Reveal from '../Reveal/Reveal';
import SectionHeading from '../SectionHeading/SectionHeading';
import { trackEvent } from '../../utils/analytics';
import './Contact.scss';

const PHONE='+998 90 097 22 72';
const onlyDigits=(value)=>value.replace(/\D/g,'');

export default function Contact(){
  const [form,setForm]=useState({name:'',phone:'',business:'Savdo',company:'',note:''});
  const [error,setError]=useState('');
  const [status,setStatus]=useState('idle');

  const emailUrl=useMemo(()=>composeEmailUrl({
    subject:`ZENIX — ${form.business} bo‘yicha so‘rov`,
    body:`Ism: ${form.name}\nTelefon: ${form.phone}\nYo‘nalish: ${form.business}\nKompaniya: ${form.company||'—'}\n\nIzoh:\n${form.note||'—'}`,
  }),[form]);

  const update=(field,value)=>{
    setForm(current=>({...current,[field]:value}));
    setError('');
    if(status!=='idle')setStatus('idle');
  };

  const submit=async(event)=>{
    event.preventDefault();
    if(form.name.trim().length<2){setError('Ismingizni kiriting.');return}
    if(onlyDigits(form.phone).length<9){setError('Telefon raqamini to‘liq kiriting.');return}
    setError('');
    setStatus('sending');
    trackEvent('lead_form_submit',{business:form.business});
    try{
      const result=await deliverLead({type:'contact',...form,createdAt:new Date().toISOString()});
      if(result.delivered){setStatus('sent');return}
      setStatus('fallback');
    }catch{
      setStatus('fallback');
    }
  };

  return <section className="contact section" id="contact"><div className="shell contact-grid">
    <Reveal><div className="contact-copy">
      <SectionHeading kicker="Bog‘lanish" title="Biznesingizni ayting. Qolganini birga aniqlaymiz." text="ZENIX Savdoni ishga tushirish, mos yo‘nalishni tanlash, o‘rnatish yoki jamoani o‘rgatish bo‘yicha bog‘laning."/>

      <div className="contact-direct">
        <a href={`tel:${PHONE.replace(/\s/g,'')}`}><span><Phone size={19}/></span><div><small>Telefon</small><strong>{PHONE}</strong></div><ArrowUpRight size={16}/></a>
        <a href={`mailto:${EMAIL}`}><span><Mail size={19}/></span><div><small>Email</small><strong>{EMAIL}</strong></div><ArrowUpRight size={16}/></a>
        {GENERAL_TELEGRAM_URL&&<a href={GENERAL_TELEGRAM_URL} target="_blank" rel="noreferrer"><span><MessageCircle size={19}/></span><div><small>Telegram</small><strong>ZENIX bilan yozishish</strong></div><ArrowUpRight size={16}/></a>}
      </div>

      <a className="instagram-cta" href="https://instagram.com/zenixuzz" target="_blank" rel="noreferrer" onClick={()=>trackEvent('instagram_open',{source:'contact'})}>
        <Instagram size={19}/><span><small>Instagram</small><strong>@zenixuzz</strong></span><b>Yangiliklar va mahsulot jarayoni</b><ArrowUpRight size={16}/>
      </a>
    </div></Reveal>

    <Reveal delay={80} className="contact-form-card">
      <div className="contact-form-top"><div><Send size={19}/><strong>So‘rov qoldirish</strong></div><p>Ism va telefon yetarli. Qolgan ma’lumotlar suhbat davomida aniqlanadi.</p></div>
      <form className="contact-form" onSubmit={submit} noValidate>
        <label><span>Ism *</span><input value={form.name} onChange={e=>update('name',e.target.value)} placeholder="Ismingiz" autoComplete="name"/></label>
        <label><span>Telefon *</span><input value={form.phone} onChange={e=>update('phone',e.target.value)} placeholder="+998 90 123 45 67" inputMode="tel" autoComplete="tel"/></label>
        <label><span>Biznes turi</span><select value={form.business} onChange={e=>update('business',e.target.value)}>{PRODUCTS.map(p=><option key={p.id}>{p.short}</option>)}</select></label>
        <label><span>Kompaniya nomi</span><input value={form.company} onChange={e=>update('company',e.target.value)} placeholder="Ixtiyoriy" autoComplete="organization"/></label>
        <label className="full"><span>Izoh</span><textarea value={form.note} onChange={e=>update('note',e.target.value)} placeholder="Nima kerakligini qisqacha yozing..." rows="4"/></label>

        {error&&<div className="contact-form-message error full" role="alert">{error}</div>}
        {status==='sent'&&<div className="contact-form-message success full"><CheckCircle2 size={17}/> So‘rovingiz qabul qilindi. Siz bilan bog‘lanamiz.</div>}
        {status==='fallback'&&<div className="contact-form-fallback full"><div><strong>So‘rov tayyor.</strong><p>So‘rov ma’lumotlari tayyor. Email orqali yuborishni davom ettiring.</p></div><a href={emailUrl}><Mail size={17}/> Email orqali yuborish</a></div>}

        <button type="submit" className="button button--primary full" disabled={status==='sending'}>{status==='sending'?'Yuborilmoqda...':'So‘rovni yuborish'} <ArrowUpRight size={18}/></button>
      </form>
    </Reveal>
  </div></section>;
}
