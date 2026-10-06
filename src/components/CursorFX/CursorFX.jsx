import { useEffect, useRef } from 'react';

export default function CursorFX(){
  const dotRef=useRef(null);
  const ringRef=useRef(null);

  useEffect(()=>{
    if(!window.matchMedia('(pointer:fine)').matches||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return undefined;
    const dot=dotRef.current;
    const ring=ringRef.current;
    if(!dot||!ring)return undefined;
    let tx=window.innerWidth*.5,ty=window.innerHeight*.5,rx=tx,ry=ty,raf=0;
    const animate=()=>{
      rx+=(tx-rx)*.14;ry+=(ty-ry)*.14;
      dot.style.transform=`translate3d(${tx}px,${ty}px,0)`;
      ring.style.transform=`translate3d(${rx}px,${ry}px,0)`;
      raf=requestAnimationFrame(animate);
    };
    const move=(event)=>{tx=event.clientX;ty=event.clientY;document.documentElement.classList.add('cursor-ready')};
    const over=(event)=>{
      const interactive=event.target.closest('a,button,[data-cursor]');
      ring.classList.toggle('is-active',Boolean(interactive));
      dot.classList.toggle('is-active',Boolean(interactive));
    };
    const down=()=>ring.classList.add('is-down');
    const up=()=>ring.classList.remove('is-down');
    window.addEventListener('pointermove',move,{passive:true});
    document.addEventListener('pointerover',over,{passive:true});
    document.addEventListener('pointerdown',down,{passive:true});
    document.addEventListener('pointerup',up,{passive:true});
    raf=requestAnimationFrame(animate);
    return()=>{
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove',move);
      document.removeEventListener('pointerover',over);
      document.removeEventListener('pointerdown',down);
      document.removeEventListener('pointerup',up);
      document.documentElement.classList.remove('cursor-ready');
    };
  },[]);

  return <div className="cursor-fx" aria-hidden="true"><span ref={ringRef} className="cursor-fx__ring"/><span ref={dotRef} className="cursor-fx__dot"/></div>;
}
