import { SIGNALS } from '../../data/siteData';

export default function SignalRail(){
  const items=[...SIGNALS,...SIGNALS];
  return <div className="signal-rail" aria-label="ZENIX asosiy faktlari"><div className="signal-rail__track">{items.map((item,index)=><span key={`${item}-${index}`} aria-hidden={index>=SIGNALS.length}><i/>{item}</span>)}</div></div>;
}
