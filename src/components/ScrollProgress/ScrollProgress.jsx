import { useEffect, useState } from 'react';
import './ScrollProgress.scss';

export default function ScrollProgress(){
  const [progress,setProgress]=useState(0);
  useEffect(()=>{
    let raf=0;
    const update=()=>{
      cancelAnimationFrame(raf);
      raf=requestAnimationFrame(()=>{
        const max=document.documentElement.scrollHeight-window.innerHeight;
        setProgress(max>0?Math.min(1,Math.max(0,window.scrollY/max)):0);
      });
    };
    update();
    window.addEventListener('scroll',update,{passive:true});
    window.addEventListener('resize',update,{passive:true});
    return()=>{window.removeEventListener('scroll',update);window.removeEventListener('resize',update);cancelAnimationFrame(raf)};
  },[]);
  return <div className="scroll-progress" aria-hidden="true"><span style={{transform:`scaleX(${progress})`}}/></div>;
}
