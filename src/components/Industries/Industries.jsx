import { ArrowUpRight, BellRing, CheckCircle2, Clock3 } from 'lucide-react';
import { PRODUCTS } from '../../data/siteData';
import Reveal from '../Reveal/Reveal';
import SectionHeading from '../SectionHeading/SectionHeading';
import './Industries.scss';

export default function Industries({onSoon}){
  return <section className="industries section" id="products">
    <div className="shell">
      <Reveal><SectionHeading kicker="Bitta brend · 6 yo‘nalish" title="Bir xil shablon emas. Har biznesga o‘z ish mantig‘i." text="Savdo, ta’lim, ishlab chiqarish, ovqatlanish, mehmonxona va dorixona bir xil jarayon bilan ishlamaydi. ZENIX har bir yo‘nalishni o‘z vazifalari, ko‘rsatkichlari va ish oqimi bilan alohida mahsulot sifatida quradi."/></Reveal>

      <div className="industries-grid">
        {PRODUCTS.map((product,index)=>{
          const Icon=product.icon;
          return <Reveal key={product.id} delay={(index%2)*55} className={`industry-card ${product.live?'is-live':''}`}>
            <div className="industry-card__head">
              <span className="industry-card__icon"><Icon size={22}/></span>
              <div><strong>{product.name}</strong><small>{product.domain}</small></div>
              {product.live?<span className="status-badge status-badge--live"><CheckCircle2 size={14}/> Ishlaydi</span>:<span className="status-badge"><Clock3 size={14}/> Tez kunda</span>}
            </div>

            <div className="industry-card__copy">
              <h3>{product.tagline}</h3>
              <p>{product.description}</p>
              <div className="industry-card__audience"><span>Kimlar uchun</span><strong>{product.audience}</strong></div>
            </div>

            <div className="industry-feature-list">
              {product.features.map(([title,text,FeatureIcon])=><div key={title} className="industry-feature"><span><FeatureIcon size={17}/></span><div><strong>{title}</strong><p>{text}</p></div></div>)}
            </div>

            <div className="industry-card__actions">
              {product.live?<><a className="button button--primary" href="https://zenixpos.uz">Platformani ochish <ArrowUpRight size={17}/></a><a className="text-action" href="https://zenixpos.uz/register">Ro‘yxatdan o‘tish <ArrowUpRight size={16}/></a></>:<button className="button button--ghost" type="button" onClick={()=>onSoon?.(product)}><BellRing size={17}/> Tayyor bo‘lganda xabar bering</button>}
            </div>
          </Reveal>;
        })}
      </div>
    </div>
  </section>;
}
