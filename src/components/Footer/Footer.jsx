import { ArrowUpRight, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import LogoMark from '../LogoMark/LogoMark';
import { PRODUCTS } from '../../data/siteData';
import './Footer.scss';

export default function Footer(){
  return <footer className="footer"><div className="shell">
    <div className="footer-top">
      <div className="footer-brand">
        <a href="#top"><LogoMark compact/><span><strong>ZENIX</strong><small>Biznes boshqaruv tizimlari</small></span></a>
        <p>O‘zbekistondagi bizneslar uchun zamonaviy web platformalar. Har yo‘nalishda o‘z biznes logikasi, barchasida bir xil aniqlik va ZENIX AI yondashuvi.</p>
      </div>

      <div className="footer-links">
        <div><strong>Mahsulotlar</strong>{PRODUCTS.map(product=>product.live?<a key={product.id} href="https://zenixpos.uz">{product.short}<span>{product.domain}</span></a>:<span className="footer-product" key={product.id}>{product.short}<small>{product.domain}</small></span>)}</div>
        <div><strong>ZENIX</strong><a href="#platform">Platforma</a><a href="#products">Yechimlar</a><a href="#ai">ZENIX AI</a><a href="#pricing">Tarif</a><a href="#investors">Investorlar</a><a href="#contact">Bog‘lanish</a></div>
        <div><strong>Aloqa</strong><a href="tel:+998900972272">+998 90 097 22 72</a><a href="mailto:zenixteam@zenix.uz">zenixteam@zenix.uz</a><a href="https://instagram.com/zenixuzz" target="_blank" rel="noreferrer"><Instagram size={16}/> @zenixuzz</a><strong className="footer-legal-title">Huquqiy</strong><Link to="/privacy">Maxfiylik siyosati</Link><Link to="/terms">Foydalanish shartlari</Link></div>
      </div>
    </div>

    <div className="footer-bottom"><span>© {new Date().getFullYear()} ZENIX. O‘zbekistonda yaratilgan.</span><span>Biznesni ko‘rish, tushunish va boshqarish uchun.</span><a href="#top">Yuqoriga <ArrowUpRight size={15}/></a></div>
  </div></footer>;
}
