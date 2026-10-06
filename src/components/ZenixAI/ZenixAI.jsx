import { useEffect, useRef, useState } from 'react';
import { ArrowUp, CheckCircle2, Sparkles } from 'lucide-react';
import { AI_CAPABILITIES, AI_DEMOS } from '../../data/siteData';
import Reveal from '../Reveal/Reveal';
import SectionHeading from '../SectionHeading/SectionHeading';
import './ZenixAI.scss';

function answerFor(value){
  const q=value.toLowerCase();
  if(q.includes('kam')||q.includes('qoldiq')||q.includes('ombor'))return AI_DEMOS[1];
  if(q.includes('30')||q.includes('foyda')||q.includes('hisobot'))return AI_DEMOS[2];
  if(q.includes('sotuvchi')||q.includes('xodim'))return AI_DEMOS[3];
  return AI_DEMOS[0];
}

export default function ZenixAI(){
  const [demo,setDemo]=useState(AI_DEMOS[0]);
  const [displayPrompt,setDisplayPrompt]=useState(AI_DEMOS[0].prompt);
  const [query,setQuery]=useState('');
  const [thinking,setThinking]=useState(false);
  const timerRef=useRef(null);

  useEffect(()=>()=>window.clearTimeout(timerRef.current),[]);

  const run=(prompt,selected)=>{
    const value=prompt.trim();
    if(!value||thinking)return;
    setThinking(true);
    setDisplayPrompt(value);
    window.clearTimeout(timerRef.current);
    timerRef.current=window.setTimeout(()=>{
      setDemo(selected||answerFor(value));
      setThinking(false);
      setQuery('');
    },420);
  };

  return <section className="zenix-ai section" id="ai">
    <div className="shell">
      <Reveal><SectionHeading kicker="ZENIX AI" title="Dashboard nimani ko‘rsatdi? Endi undan nimani qilishni so‘rang." text="ZENIX AI biznes ma’lumotlarini oddiy savolga, tushunarli tahlilga va bajariladigan keyingi qadamga bog‘laydi. Maqsad — yana bitta chat oynasi yaratish emas, tizim ichidagi ishni tezlashtirish."/></Reveal>

      <div className="ai-layout">
        <Reveal delay={70} className="ai-demo-card">
          <div className="ai-demo-card__head"><span><Sparkles size={18}/> ZENIX AI</span><small>Interfeys demo</small></div>
          <div className="ai-demo-card__body">
            <div className="ai-user-message">{displayPrompt}</div>
            <div className={`ai-response ${thinking?'is-thinking':''}`} aria-live="polite">
              <div className="ai-response__meta"><span className="ai-response__logo"><Sparkles size={15}/></span><strong>ZENIX AI</strong></div>
              {thinking?<div className="ai-loading" aria-label="Tahlil qilinmoqda"><span/><span/><span/></div>:<>
                <p>{demo.answer}</p>
                <div className="ai-result"><CheckCircle2 size={17}/><span>{demo.action}</span></div>
              </>}
            </div>
          </div>

          <div className="ai-quick-prompts" aria-label="Tayyor demo savollari">
            {AI_DEMOS.map(item=><button key={item.prompt} type="button" onClick={()=>run(item.prompt,item)} disabled={thinking}>{item.prompt}</button>)}
          </div>

          <form className="ai-composer" onSubmit={event=>{event.preventDefault();run(query)}}>
            <input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Masalan: bugun qaysi mahsulotlar ko‘p sotildi?" aria-label="ZENIX AI demo savoli"/>
            <button type="submit" disabled={thinking||!query.trim()} aria-label="Savolni yuborish"><ArrowUp size={18}/></button>
          </form>
        </Reveal>

        <div className="ai-capability-grid">
          {AI_CAPABILITIES.map((item,index)=>{const Icon=item.icon;return <Reveal key={item.title} delay={90+index*45} className="ai-capability-card"><span><Icon size={20}/></span><div><h3>{item.title}</h3><p>{item.text}</p></div></Reveal>})}
        </div>
      </div>
    </div>
  </section>;
}
