import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Contact from './components/Contact/Contact';
import FAQ from './components/FAQ/FAQ';
import Features from './components/Features/Features';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Industries from './components/Industries/Industries';
import Investor from './components/Investor/Investor';
import LegalPage from './components/LegalPage/LegalPage';
import NotifyModal from './components/NotifyModal/NotifyModal';
import PlatformShowcase from './components/PlatformShowcase/PlatformShowcase';
import Pricing from './components/Pricing/Pricing';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import ZenixAI from './components/ZenixAI/ZenixAI';
import useReveal from './hooks/useReveal';

function Landing(){
  const [soonProduct,setSoonProduct]=useState(null);
  useReveal();

  useEffect(()=>{
    document.title='ZENIX — AI yordamida biznes boshqaruvining yangi avlodi';
  },[]);

  return <div className="site-root">
    <ScrollProgress/>
    <a className="skip-link" href="#main-content">Asosiy kontentga o‘tish</a>
    <Header onSoon={setSoonProduct}/>
    <main id="main-content">
      <Hero/>
      <PlatformShowcase/>
      <Industries onSoon={setSoonProduct}/>
      <ZenixAI/>
      <Features/>
      <Pricing/>
      <Investor/>
      <FAQ/>
      <Contact/>
    </main>
    <Footer/>
    <NotifyModal product={soonProduct} onClose={()=>setSoonProduct(null)}/>
  </div>;
}

function ScrollToTop(){
  const {pathname}=useLocation();
  useEffect(()=>{
    window.scrollTo({top:0,left:0,behavior:'auto'});
  },[pathname]);
  return null;
}

export default function App(){
  return <>
    <ScrollToTop/>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/privacy" element={<LegalPage type="privacy"/>}/>
      <Route path="/terms" element={<LegalPage type="terms"/>}/>
      <Route path="*" element={<Landing/>}/>
    </Routes>
  </>;
}
