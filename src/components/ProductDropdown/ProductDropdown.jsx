import { ArrowUpRight, Clock3 } from 'lucide-react';
import { PRODUCTS } from '../../data/siteData';
import './ProductDropdown.scss';

export default function ProductDropdown({ mode='login', onSoon, onNavigate }) {
  const label=mode==='login'?'Kirish':'Ro‘yxatdan o‘tish';
  const hrefFor=(product)=>mode==='login'?`https://${product.domain}/login`:`https://${product.domain}/register`;

  return <div className="product-dropdown" aria-label={`${label} uchun yo‘nalish tanlash`}>
    <div className="product-dropdown__head">
      <strong>{label}</strong>
      <span>Yo‘nalishni tanlang</span>
    </div>
    <div className="product-dropdown__list">
      {PRODUCTS.map(product=>{
        const Icon=product.icon;
        if(product.live){
          return <a key={product.id} href={hrefFor(product)} className="product-drop-item" onClick={onNavigate}>
            <span className="product-drop-item__icon"><Icon size={17}/></span>
            <span className="product-drop-item__copy"><strong>{product.name}</strong><small>{product.domain}</small></span>
            <ArrowUpRight size={16}/>
          </a>;
        }
        return <button key={product.id} type="button" className="product-drop-item" onClick={()=>onSoon?.(product)}>
          <span className="product-drop-item__icon"><Icon size={17}/></span>
          <span className="product-drop-item__copy"><strong>{product.name}</strong><small>{product.domain}</small></span>
          <span className="soon-badge"><Clock3 size={12}/> Tez kunda</span>
        </button>;
      })}
    </div>
  </div>;
}
