const EMAIL='zenixteam@zenix.uz';

export const GENERAL_TELEGRAM_URL=(import.meta.env.VITE_TELEGRAM_URL||'').trim();
export const LEAD_ENDPOINT=(import.meta.env.VITE_LEAD_ENDPOINT||'').trim();

export function composeEmailUrl({subject,body}){
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function deliverLead(payload){
  if(!LEAD_ENDPOINT)return {delivered:false,reason:'endpoint-not-configured'};
  const response=await fetch(LEAD_ENDPOINT,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(payload),
  });
  if(!response.ok)throw new Error(`Lead endpoint returned ${response.status}`);
  return {delivered:true};
}

export {EMAIL};
