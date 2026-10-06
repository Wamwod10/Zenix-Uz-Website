import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import LogoMark from '../LogoMark/LogoMark';
import './LegalPage.scss';

const privacySections = [
  ['1. Umumiy qoidalar', 'Ushbu sahifa ZENIX veb-sayti orqali yuboriladigan aloqa va qiziqish bildirish ma’lumotlari bilan ishlashning umumiy tamoyillarini tushuntiradi.'],
  ['2. Qaysi ma’lumotlar olinishi mumkin', 'Aloqa yoki “Tez kunda” formasida ism, telefon raqami, biznes turi, kompaniya nomi va foydalanuvchi ixtiyoriy ravishda yozgan izoh olinishi mumkin.'],
  ['3. Ma’lumotdan foydalanish', 'Ma’lumotlar foydalanuvchi bilan bog‘lanish, mahsulot bo‘yicha maslahat berish, qiziqish bildirilgan ZENIX yo‘nalishi tayyor bo‘lganda xabar berish va so‘rovni ko‘rib chiqish uchun ishlatiladi.'],
  ['4. Uchinchi tomonlar', 'Ma’lumotlar reklama maqsadida sotilmaydi. Zarur texnik xizmatlar ishlatilganda faqat xizmatni bajarish uchun kerak bo‘lgan darajada uzatilishi mumkin.'],
  ['5. Saqlash va xavfsizlik', 'Ma’lumotlarni himoya qilish uchun amaliy tashkiliy va texnik choralar qo‘llanadi. Foydalanuvchi o‘z ma’lumotlari bo‘yicha savol yoki tuzatish so‘rovi bilan murojaat qilishi mumkin.'],
  ['6. Aloqa', 'Maxfiylik bo‘yicha savollar uchun zenixteam@zenix.uz manziliga yozish mumkin.'],
];

const termsSections = [
  ['1. Saytdan foydalanish', 'ZENIX sayti mahsulotlar, tariflar, mahsulot holati va kompaniya bilan bog‘lanish imkoniyatlari haqida ma’lumot berish uchun mo‘ljallangan.'],
  ['2. Mahsulot holati', 'ZENIX Savdo faol mahsulot. Qolgan mahsulotlarda “Tez kunda” belgisi ularning hali ommaviy foydalanishga ochilmaganini anglatadi.'],
  ['3. Narxlar', 'Saytda ko‘rsatilgan asosiy tarif oyiga 350 000 so‘m yoki yiliga 3 300 000 so‘m. Bitta akkauntda 2 ta filial tarif ichida; qo‘shimcha filial narxi alohida ko‘rsatiladi. Maxsus ishga tushirish shartlari alohida kelishilishi mumkin.'],
  ['4. Alohida mahsulotlar', 'Har bir ZENIX yo‘nalishi alohida akkaunt va o‘ziga xos funksional imkoniyatlarga ega. Bir yo‘nalish obunasi avtomatik ravishda boshqa ZENIX mahsulotlariga kirish bermaydi.'],
  ['5. ZENIX AI', 'ZENIX AI funksiyalari mahsulot va foydalanuvchi ruxsatlariga qarab tizim ma’lumotlarini tahlil qilish, savollarga javob berish va ayrim ish jarayonlarini boshlashga yordam berishi mumkin.'],
  ['6. Yangilanishlar', 'Mahsulotlar rivojlanishi bilan ushbu shartlar, narxlar va sayt ma’lumotlari yangilanib borishi mumkin.'],
];

export default function LegalPage({ type }){
  const privacy=type==='privacy';
  const sections=privacy?privacySections:termsSections;
  useEffect(()=>{document.title=`${privacy?'Maxfiylik siyosati':'Foydalanish shartlari'} — ZENIX`;},[privacy]);
  return <main className="legal-page"><div className="legal-nav shell"><Link to="/"><LogoMark compact/><span>ZENIX</span></Link><Link className="legal-back" to="/"><ArrowLeft size={15}/> Bosh sahifa</Link></div><div className="shell legal-content"><span className="section-kicker">Huquqiy</span><h1>{privacy?'Maxfiylik siyosati':'Foydalanish shartlari'}</h1><p className="legal-intro">So‘nggi yangilanish: 2026-yil 6-oktabr</p><div className="legal-sections">{sections.map(([title,text])=><section key={title}><h2>{title}</h2><p>{text}</p></section>)}</div><p className="legal-note">Qo‘shimcha savollar uchun <a href="mailto:zenixteam@zenix.uz">zenixteam@zenix.uz</a> manziliga murojaat qilishingiz mumkin.</p></div></main>;
}
