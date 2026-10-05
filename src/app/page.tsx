"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const LANGUAGES = {
  en: {
    heroTitle1: "Cheap Flights", heroTitle2: "Dubai to Ethiopia", heroTitle3: "+ UAE Visa & Umrah",
    heroSub: "Full-service travel agency + typing center in Ras Al Khaimah. Flights, hotels, UAE visa, Umrah, tours, transport, insurance & typing for Ethiopian community in UAE.",
    servicesTitle: "Our Services", cta: "Book Now", allServices: "Complete Travel, Visa & Typing in RAK UAE",
    items: [
      { t: "Flight Services", d: "DXB-ADD, DXB-JED, business & group", seo: "flight booking Dubai Ethiopia" },
      { t: "Hotels & Stay", d: "Hotels, resorts, villas Dubai & Addis", seo: "hotel booking UAE" },
      { t: "Visa Services", d: "Tourist, visit, extension, tracking", seo: "UAE visa RAK" },
      { t: "Travel Packages", d: "Flight+Hotel+Visa+Transfer", seo: "Dubai packages" },
      { t: "Transport", d: "Airport pickup, chauffeur, rental", seo: "airport transfer Dubai" },
      { t: "Tours & Safari", d: "Desert safari, city tours, cruises", seo: "desert safari" },
      { t: "Umrah & Hajj", d: "Makkah Madinah hotels & visa", seo: "Umrah package UAE" },
      { t: "Business Travel", d: "Corporate travel management", seo: "corporate travel Dubai" },
      { t: "Insurance", d: "Medical, baggage, cancellation", seo: "travel insurance" },
      { t: "Ethiopia Special", d: "UAE ↔ Ethiopia specialist", seo: "Ethiopian flights", hot: true },
      { t: "Typing Center", d: "Govt forms, Emirates ID, CV", seo: "typing center RAK", hot: true },
      { t: "AI Assistant", d: "AI budget & itinerary generator", seo: "AI travel UAE", hot: true },
    ]
  },
  ar: {
    heroTitle1: "أرخص تذاكر", heroTitle2: "دبي إلى إثيوبيا", heroTitle3: "+ تأشيرة الإمارات والعمرة",
    heroSub: "وكالة سفر ومركز طباعة متكامل في رأس الخيمة. حجز طيران، فنادق، تأشيرات الإمارات، باقات عمرة، جولات، توصيل، تأمين وخدمات الطباعة للجالية الإثيوبية.",
    servicesTitle: "خدماتنا", cta: "احجز الآن", allServices: "خدمات السفر والتأشيرات والطباعة في رأس الخيمة",
    items: [
      { t: "خدمات الطيران", d: "دبي-أديس، دبي-جدة، رجال أعمال", seo: "حجز طيران دبي إثيوبيا" },
      { t: "الفنادق", d: "فنادق ومنتجعات دبي وأديس", seo: "حجز فندق" },
      { t: "خدمات التأشيرات", d: "سياحية، زيارة، تمديد", seo: "تأشيرة الإمارات" },
      { t: "الباقات السياحية", d: "طيران+فندق+تأشيرة+توصيل", seo: "باقات سفر" },
      { t: "المواصلات", d: "توصيل مطار، سائق، تأجير", seo: "توصيل مطار" },
      { t: "الجولات", d: "سفاري صحراوي، جولات مدينة", seo: "سفاري دبي" },
      { t: "العمرة والحج", d: "فنادق مكة والمدينة", seo: "باقة عمرة" },
      { t: "سفر الأعمال", d: "إدارة سفر الشركات", seo: "سفر شركات" },
      { t: "التأمين", d: "طبي، أمتعة، إلغاء", seo: "تأمين سفر" },
      { t: "إثيوبيا الخاص", d: "متخصص الإمارات ↔ إثيوبيا", seo: "طيران إثيوبي", hot: true },
      { t: "مركز الطباعة", d: "معاملات، هوية إماراتية", seo: "مركز طباعة", hot: true },
      { t: "المساعد الذكي", d: "حساب ميزانية ومسار", seo: "ذكاء اصطناعي", hot: true },
    ]
  },
  am: {
    heroTitle1: "ርካሽ በረራዎች", heroTitle2: "ዱባይ ወደ ኢትዮጵያ", heroTitle3: "+ የዩኤኢ ቪዛ እና ኡምራ",
    heroSub: "በራስ አል-ኻይማህ ያለ ሙሉ አገልግሎት የጉዞ ኤጀንሲ + የታይፒንግ ማዕከል። በረራ፣ ሆቴል፣ ቪዛ፣ ኡምራ፣ ጉብኝት፣ ትራንስፖርት፣ ኢንሹራንስ እና የታይፒንግ አገልግሎት ለኢትዮጵያውያን ማህበረሰብ።",
    servicesTitle: "አገልግሎቶቻችን", cta: "አሁን ይመዝገቡ", allServices: "ሙሉ የጉዞ፣ ቪዛ እና ታይፒንግ በRAK UAE",
    items: [
      { t: "የበረራ አገልግሎት", d: "DXB-ADD, DXB-JED, ቢዝነስ", seo: "በረራ ዱባይ ኢትዮጵያ" },
      { t: "ሆቴሎች", d: "ሆቴሎች፣ ሪዞርቶች ዱባይ እና አዲስ", seo: "ሆቴል ዩኤኢ" },
      { t: "የቪዛ አገልግሎት", d: "ቱሪስት፣ ጉብኝት፣ ማራዘሚያ", seo: "ቪዛ ዩኤኢ" },
      { t: "የጉዞ ፓኬጆች", d: "በረራ+ሆቴል+ቪዛ+ትራንስፖርት", seo: "የጉዞ ፓኬጅ" },
      { t: "ትራንስፖርት", d: "ኤርፖርት መቀበያ፣ ኪራይ", seo: "ኤርፖርት ትራንስፖርት" },
      { t: "ጉብኝቶች", d: "የበረሃ ሳፋሪ፣ የከተማ ጉብኝት", seo: "ሳፋሪ ዱባይ" },
      { t: "ኡምራ እና ሐጅ", d: "መካ መዲና ሆቴሎች", seo: "ኡምራ ፓኬጅ" },
      { t: "የቢዝነስ ጉዞ", d: "የኮርፖሬት ጉዞ አስተዳደር", seo: "ቢዝነስ ጉዞ" },
      { t: "ኢንሹራንስ", d: "ሕክምና፣ ሻንጣ፣ መሰረዝ", seo: "ኢንሹራንስ" },
      { t: "ኢትዮጵያ ልዩ", d: "ዩኤኢ ↔ ኢትዮጵያ ስፔሻሊስት", seo: "የኢትዮጵያ በረራ", hot: true },
      { t: "ታይፒንግ ማዕከል", d: "የመንግስት ቅጾች፣ ኤሚሬትስ ID", seo: "ታይፒንግ RAK", hot: true },
      { t: "AI ረዳት", d: "በጀት እና መርሃ ግብር", seo: "AI ጉዞ", hot: true },
    ]
  }
};

const imgs = [
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600",
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600",
  "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=600",
  "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600",
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600",
  "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600",
  "https://images.unsplash.com/photo-1497366216548-37526070297b?w=600",
  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600",
  "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=600",
  "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600",
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
];

export default function Home() {
  const [lang, setLang] = useState<"en"|"ar"|"am">("en");
  const L = LANGUAGES[lang];
  const isRTL = lang === "ar";
  return (
    <main className={`min-h-screen bg-black text-white ${isRTL?"rtl":"ltr"}`} dir={isRTL?"rtl":"ltr"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@type":"TravelAgency","name":"Wanofii Travel RAK","alternateName":["وانوفي للسفر","ዋኖፊ ጉዞ"],"description": L.heroSub, "address":{"@type":"PostalAddress","addressLocality":"Ras Al Khaimah","addressCountry":"AE"}, "areaServed":["AE","ET","SA"], "availableLanguage":["en","ar","am"]
      })}} />

      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur flex justify-between items-center p-4">
  <div className="text-xl font-black">
    <span>Wanofii</span>
  </div>

  <div className="flex gap-2 items-center">
    <div className="flex bg-white/10 rounded-full p-1">
      {(["en","ar","am"] as const).map(l=> (
        <button key={l} onClick={()=>setLang(l)} className={`px-3 py-1 rounded-full text-sm ${lang===l ? 'bg-white text-black' : 'text-white'}`}>{l.toUpperCase()}</button>
      ))}
    </div>
  </div>

  {/* WhatsApp Button - RIGHT ALIGNED - FIXED */}
  <div className="flex justify-end gap-3">
    <a
      href="https://wa.me/971569802812?text=Salam%20Wanofii%20I%20want%20to%20book%20from%20RAK"
      target="_blank"
      className="bg-green-500 text-white px-4 py-2 rounded-full font-bold text-sm"
    >
      WhatsApp
    </a>
    <a
      href="mailto:sintsew0@gmail.com"
      className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm"
    >
      Email
    </a>
  </div>
</nav>

      <section className="relative h-[78vh] flex items-center">
        <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600" alt="flights Dubai Ethiopia - Wanofii" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <h1 className="text-4xl md:text-7xl font-black leading-[0.9]">{L.heroTitle1}<br/><span className="text-[#D4AF37]">{L.heroTitle2}</span><br/>{L.heroTitle3}</h1>
            <h2 className="text-white/60 mt-4 max-w-2xl text-base md:text-lg">{L.heroSub}</h2>
            <div className="mt-6 flex gap-2 flex-wrap text-[11px]"><span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full">SEO: Dubai Addis flights</span><span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full">UAE visa RAK</span><span className="bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-3 py-1 rounded-full">🇪🇹 Ethiopian Community</span></div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-black mb-1">{L.servicesTitle} <span className="text-[#D4AF37]">— {L.allServices}</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">
          {L.items.map((s,i)=>(
            <div key={i} className={`rounded-[1.8rem] overflow-hidden border group ${s.hot?"border-[#D4AF37]/50 bg-zinc-900":"border-white/10 bg-zinc-900/60"} hover:border-[#D4AF37]/60 transition`}>
              <div className="relative h-44 overflow-hidden">
                <img src={imgs[i]} alt={`${s.seo} Wanofii RAK`} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute bottom-3 left-4 font-black text-lg">{s.t}</div>
                {s.hot && <div className="absolute top-3 right-3 bg-[#D4AF37] text-black text-[9px] font-black px-2 py-1 rounded-full">HOT</div>}
              </div>
              <div className="p-4"><p className="text-xs text-white/60">{s.d}</p><p className="text-[9px] text-white/20 mt-2 uppercase">{s.seo}</p></div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 py-6 text-center text-white/30 text-[11px]">WANO FII RAK • travel agency Ras Al Khaimah • رحلات إثيوبيا • የኢትዮጵያ በረራዎች • +971 50 123 4567</footer>
    </main>
  );
}