import { FACTS, FEATURE_HIGHLIGHTS, WORKFLOW } from '../../data/siteData';
import Reveal from '../Reveal/Reveal';
import SectionHeading from '../SectionHeading/SectionHeading';
import './Features.scss';

export default function Features(){
  return <section className="features section" id="features">
    <div className="shell">
      <Reveal><SectionHeading kicker="Kundalik ish uchun" title="Tizim murakkab bo‘lishi mumkin. Foydalanish esa murakkab bo‘lmasligi kerak." text="ZENIX ichki biznes logikasini tartiblaydi va har bir rolga kerakli ishni kerakli paytda ko‘rsatadi. Natijada platforma ko‘p funksiyali bo‘lsa ham, kundalik oqim tushunarli qoladi."/></Reveal>

      <div className="feature-highlight-grid">
        {FEATURE_HIGHLIGHTS.map((item,index)=>{const Icon=item.icon;return <Reveal key={item.title} delay={index*55} className="feature-highlight-card"><span className="feature-highlight-card__icon"><Icon size={22}/></span><small>{item.eyebrow}</small><h3>{item.title}</h3><p>{item.text}</p></Reveal>})}
      </div>

      <Reveal delay={90} className="workflow-block">
        <div className="workflow-head"><span>ZENIX ish oqimi</span><strong>Ko‘ring → tushuning → harakat qiling.</strong></div>
        <div className="workflow-grid">
          {WORKFLOW.map((item,index)=>{const Icon=item.icon;return <article key={item.title}><span className="workflow-icon"><Icon size={21}/></span><div><small>0{index+1}</small><h3>{item.title}</h3><p>{item.text}</p></div></article>})}
        </div>
      </Reveal>

      <Reveal delay={120} className="facts-block">
        <div className="facts-block__head"><span>Raqamlar</span><strong>Marketing va’dalari emas — tarif va platforma modelidagi aniq faktlar.</strong></div>
        <div className="facts-grid">{FACTS.map(item=><div key={`${item.value}-${item.label}`}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div>
      </Reveal>
    </div>
  </section>;
}
