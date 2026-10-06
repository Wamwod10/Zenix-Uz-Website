import { ArrowUpRight, MessageCircle } from 'lucide-react';

export default function MobileActionBar(){
  return <div className="mobile-action-bar" aria-label="Tezkor amallar">
    <a href="https://zenixpos.uz" target="_blank" rel="noreferrer"><span><small>Hozir faol</small><strong>ZENIX Savdo</strong></span><ArrowUpRight size={15}/></a>
    <a href="#contact" className="primary"><MessageCircle size={15}/><strong>Bog‘lanish</strong></a>
  </div>;
}
