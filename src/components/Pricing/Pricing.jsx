import { useMemo, useState } from 'react';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import Reveal from '../Reveal/Reveal';
import SectionHeading from '../SectionHeading/SectionHeading';
import './Pricing.scss';

const ITEMS=[
  'Tanlangan ZENIX mahsulotining asosiy modullari',
  'ZENIX AI',
  '2 ta filial tarif ichida',
  'Ko‘p xodim uchun alohida loginlar',
  'Mobil web ilova tajribasi',
  '24/7 murojaat qabul qilish',
];

export default function Pricing(){
  const [annual,setAnnual]=useState(true);
  const view=useMemo(()=>annual?{
    price:'3 300 000',unit:'so‘m / yil',note:'Oyiga 275 000 so‘m ekvivalent',saving:'900 000 so‘m tejaysiz',
  }:{
    price:'350 000',unit:'so‘m / oy',note:'Oyma-oy to‘lov',saving:null,
  },[annual]);

  return <section className="pricing section" id="pricing">
    <div className="shell">
      <Reveal><SectionHeading kicker="ZENIX Intelligence tarifi" title="Bitta narx tamoyili. Har yo‘nalish — alohida mahsulot." text="Savdo, Education, Production, Food, Hotel yoki Pharma alohida akkaunt sifatida ishlaydi. Har bir yo‘nalish uchun tarif tamoyili bir xil."/></Reveal>

      <div className="pricing-grid">
        <Reveal delay={70} className="pricing-card">
          <div className="pricing-card__header">
            <span className="pricing-name"><Sparkles size={17}/> ZENIX Intelligence</span>
            <div className="pricing-toggle" aria-label="Tarif davri">
              <button type="button" className={!annual?'active':''} onClick={()=>setAnnual(false)}>Oylik</button>
              <button type="button" className={annual?'active':''} onClick={()=>setAnnual(true)}>Yillik</button>
            </div>
          </div>

          <div className="pricing-price"><strong>{view.price}</strong><span>{view.unit}</span><p>{view.note}</p>{view.saving&&<b>{view.saving}</b>}</div>

          <div className="pricing-list">{ITEMS.map(item=><div key={item}><span><Check size={15}/></span><p>{item}</p></div>)}</div>

          <a className="button button--primary pricing-cta" href="#contact">Biz bilan bog‘lanish <ArrowUpRight size={18}/></a>
        </Reveal>

        <div className="pricing-side">
          <Reveal delay={100} className="pricing-side__card">
            <span>Filiallar</span>
            <h3>2 ta filial tarif ichida.</h3>
            <p>3-filialdan boshlab har bir qo‘shimcha filial alohida hisoblanadi.</p>
            <div className="branch-prices"><div><strong>120 000</strong><small>so‘m / oy</small></div><div><strong>1 200 000</strong><small>so‘m / yil</small></div></div>
          </Reveal>
          <Reveal delay={130} className="pricing-side__card">
            <span>Ishga tushirish</span>
            <h3>O‘rnatish va jamoani o‘rgatish.</h3>
            <p>Boshlang‘ich sozlash, o‘rnatish va jamoani o‘rgatish biznes hajmi va ish oqimiga qarab kelishiladi.</p>
            <a className="text-action" href="#contact">Bog‘lanish <ArrowUpRight size={16}/></a>
          </Reveal>
        </div>
      </div>
    </div>
  </section>;
}
