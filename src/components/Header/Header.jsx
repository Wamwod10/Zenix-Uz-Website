import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import LogoMark from '../LogoMark/LogoMark';
import ProductDropdown from '../ProductDropdown/ProductDropdown';
import './Header.scss';

const NAV=[
  ['Platforma','#platform'],
  ['Yechimlar','#products'],
  ['ZENIX AI','#ai'],
  ['Tarif','#pricing'],
  ['Investorlar','#investors'],
];

export default function Header({onSoon}){
  const [menuOpen,setMenuOpen]=useState(false);
  const [drop,setDrop]=useState(null);
  const [scrolled,setScrolled]=useState(false);
  const headerRef=useRef(null);

  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>12);
    const onPointer=(event)=>{if(!headerRef.current?.contains(event.target))setDrop(null)};
    const onKey=(event)=>{if(event.key==='Escape'){setDrop(null);setMenuOpen(false)}};
    onScroll();
    window.addEventListener('scroll',onScroll,{passive:true});
    document.addEventListener('pointerdown',onPointer);
    document.addEventListener('keydown',onKey);
    return()=>{
      window.removeEventListener('scroll',onScroll);
      document.removeEventListener('pointerdown',onPointer);
      document.removeEventListener('keydown',onKey);
    };
  },[]);

  useEffect(()=>{
    if(!menuOpen)return undefined;
    const previous=document.body.style.overflow;
    document.body.style.overflow='hidden';
    return()=>{document.body.style.overflow=previous};
  },[menuOpen]);

  const closeAll=()=>{setMenuOpen(false);setDrop(null)};
  const openSoon=(product)=>{closeAll();onSoon?.(product)};

  return <header className={`site-header ${scrolled?'is-scrolled':''}`} ref={headerRef}>
    <div className="site-header__inner shell">
      <a className="brand" href="#top" onClick={closeAll} aria-label="ZENIX bosh sahifa">
        <LogoMark compact/>
        <span className="brand__copy"><strong>ZENIX</strong><small>Biznes boshqaruv tizimlari</small></span>
      </a>

      <nav className="desktop-nav" aria-label="Asosiy navigatsiya">
        {NAV.map(([label,href])=><a key={href} href={href}>{label}</a>)}
      </nav>

      <div className="header-actions">
        <div className="header-drop-wrap desktop-account-action">
          <button className="header-link-btn" type="button" aria-haspopup="true" aria-expanded={drop==='login'} onClick={()=>setDrop(drop==='login'?null:'login')}>Kirish <ChevronDown size={15}/></button>
          {drop==='login'&&<ProductDropdown mode="login" onSoon={openSoon} onNavigate={closeAll}/>} 
        </div>
        <div className="header-drop-wrap desktop-account-action">
          <button className="header-register-btn" type="button" aria-haspopup="true" aria-expanded={drop==='register'} onClick={()=>setDrop(drop==='register'?null:'register')}>Ro‘yxatdan o‘tish <ChevronDown size={15}/></button>
          {drop==='register'&&<ProductDropdown mode="register" onSoon={openSoon} onNavigate={closeAll}/>} 
        </div>
        <a className="header-contact" href="#contact">Bog‘lanish <ArrowUpRight size={15}/></a>
        <button className="mobile-menu-btn" type="button" onClick={()=>setMenuOpen(v=>!v)} aria-expanded={menuOpen} aria-label={menuOpen?'Menyuni yopish':'Menyuni ochish'}>{menuOpen?<X size={21}/>:<Menu size={21}/>}</button>
      </div>
    </div>

    {menuOpen&&<div className="mobile-menu-panel">
      <div className="mobile-menu-panel__inner shell">
        <nav className="mobile-menu-panel__links" aria-label="Mobil navigatsiya">
          {NAV.map(([label,href])=><a key={href} href={href} onClick={closeAll}>{label}<ArrowUpRight size={17}/></a>)}
          <a href="#contact" onClick={closeAll}>Bog‘lanish <ArrowUpRight size={17}/></a>
        </nav>
        <div className="mobile-menu-panel__accounts">
          <div className="mobile-product-action">
            <button type="button" onClick={()=>setDrop(drop==='login'?null:'login')} aria-expanded={drop==='login'}>Kirish <ChevronDown size={16}/></button>
            {drop==='login'&&<ProductDropdown mode="login" onSoon={openSoon} onNavigate={closeAll}/>} 
          </div>
          <div className="mobile-product-action">
            <button type="button" className="primary" onClick={()=>setDrop(drop==='register'?null:'register')} aria-expanded={drop==='register'}>Ro‘yxatdan o‘tish <ChevronDown size={16}/></button>
            {drop==='register'&&<ProductDropdown mode="register" onSoon={openSoon} onNavigate={closeAll}/>} 
          </div>
        </div>
      </div>
    </div>}
  </header>;
}
