import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../../data/siteData';
import Reveal from '../Reveal/Reveal';
import SectionHeading from '../SectionHeading/SectionHeading';
import './FAQ.scss';

export default function FAQ(){
  const [open,setOpen]=useState(0);
  return <section className="faq section" id="faq"><div className="shell"><Reveal><SectionHeading kicker="Ko‘p so‘raladi" title="Savol qisqa bo‘lsa, javob ham shunday bo‘lishi kerak." text="ZENIX, tarif, filiallar va ishga tushirish haqida eng universal savollar."/></Reveal><div className="faq-list">{FAQS.map(([q,a],i)=><Reveal key={q} delay={(i%4)*40} className={`faq-item ${open===i?'is-open':''}`}><button type="button" onClick={()=>setOpen(open===i?-1:i)} aria-expanded={open===i}><span><small>{String(i+1).padStart(2,'0')}</small>{q}</span><ChevronDown size={18}/></button><div className="faq-answer"><p>{a}</p></div></Reveal>)}</div></div></section>;
}
