import { forwardRef } from 'react';
import './Reveal.scss';

const Reveal=forwardRef(function Reveal({children,className='',delay=0,as:Tag='div',style,...rest},ref){
  return <Tag ref={ref} className={`reveal ${className}`} data-reveal style={{'--reveal-delay':`${delay}ms`,...(style||{})}} {...rest}>{children}</Tag>;
});

export default Reveal;
