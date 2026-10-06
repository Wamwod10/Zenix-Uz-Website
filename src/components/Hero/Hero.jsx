import { ArrowDown, ArrowUpRight, BrainCircuit, Layers3, Sparkles } from 'lucide-react';
import { METRICS } from '../../data/siteData';
import LogoMark from '../LogoMark/LogoMark';
import Reveal from '../Reveal/Reveal';
import './Hero.scss';

export default function Hero(){
  return <section className="hero section" id="top">
    <div className="shell hero__grid">
      <div className="hero__copy">
        <Reveal><span className="hero-eyebrow"><Sparkles size={16}/> O‘zbekistonda yaratilgan biznes platformalari</span></Reveal>
        <Reveal delay={50}><h1>AI yordamida biznes boshqaruvining <span>yangi avlodi.</span></h1></Reveal>
        <Reveal delay={90}><p className="hero-lead">ZENIX jarayonlarni shunchaki raqamlashtirmaydi. Savdo, ombor, jamoa va hisobotlarni bir oqimga bog‘laydi; ZENIX AI esa shu ma’lumotdan nima muhimligini tushunishga va keyingi ishni boshlashga yordam beradi.</p></Reveal>
        <Reveal delay={130}><div className="hero-actions">
          <a className="button button--primary" href="#contact">Biz bilan bog‘lanish <ArrowUpRight size={18}/></a>
          <a className="button button--ghost" href="https://zenixpos.uz">ZENIX Savdoni ko‘rish <ArrowUpRight size={17}/></a>
        </div></Reveal>
        <Reveal delay={165}><a className="hero-products-link" href="#products">6 yo‘nalishni ko‘rish <ArrowDown size={16}/></a></Reveal>
      </div>

      <Reveal className="hero-visual" delay={80}>
        <div className="hero-logo-stage">
          <div className="hero-logo-stage__glow" aria-hidden="true"/>
          <LogoMark hero/>
          <div className="hero-visual-note hero-visual-note--ai"><span><BrainCircuit size={19}/></span><div><small>ZENIX AI</small><strong>savol → tahlil → amal</strong></div></div>
          <div className="hero-visual-note hero-visual-note--brand"><span><Layers3 size={19}/></span><div><small>Bitta brend</small><strong>6 biznes yo‘nalishi</strong></div></div>
        </div>
      </Reveal>
    </div>

    <div className="shell hero-metrics" aria-label="ZENIX faktlari">
      {METRICS.map(item=><Reveal key={item.label} className="hero-metric"><strong>{item.value}</strong><span>{item.label}</span></Reveal>)}
    </div>
  </section>;
}
