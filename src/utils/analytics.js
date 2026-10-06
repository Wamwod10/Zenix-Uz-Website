export function trackEvent(name,detail={}){
  if(typeof window==='undefined')return;
  const payload={event:name,...detail};
  if(Array.isArray(window.dataLayer))window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent('zenix:analytics',{detail:payload}));
}
