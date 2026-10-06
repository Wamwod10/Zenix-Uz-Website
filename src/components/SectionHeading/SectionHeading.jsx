import './SectionHeading.scss';

export default function SectionHeading({kicker,title,text,align='left'}){
  return <div className={`section-heading section-heading--${align}`}>
    {kicker&&<span className="section-kicker">{kicker}</span>}
    <h2>{title}</h2>
    {text&&<p>{text}</p>}
  </div>;
}
