"use client";
import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { defaultData, type SiteContent } from "@/lib/store";

const SERVICE_ENQUIRY_FIELDS: Record<number, { label: string; type?: string }[]> = {
  1: [{ label: "From" }, { label: "To" }, { label: "Departure date", type: "date" }, { label: "Return date", type: "date" }, { label: "Travellers", type: "number" }],
  2: [{ label: "Destination" }, { label: "Check-in", type: "date" }, { label: "Check-out", type: "date" }, { label: "Guests", type: "number" }],
  3: [{ label: "Visa destination or type" }, { label: "Nationality" }, { label: "Planned travel date", type: "date" }],
  4: [{ label: "Destination" }, { label: "Departure date", type: "date" }, { label: "Travellers", type: "number" }, { label: "Budget (AED)" }],
  5: [{ label: "Pickup location" }, { label: "Drop-off location" }, { label: "Date and time", type: "datetime-local" }, { label: "Passengers", type: "number" }],
  6: [{ label: "Tour or destination" }, { label: "Preferred date", type: "date" }, { label: "Travellers", type: "number" }],
  7: [{ label: "Company name" }, { label: "Destination" }, { label: "Travel dates" }, { label: "Travellers", type: "number" }],
  8: [{ label: "Destination" }, { label: "Departure date", type: "date" }, { label: "Return date", type: "date" }, { label: "Travellers", type: "number" }],
  9: [{ label: "From" }, { label: "To" }, { label: "Departure date", type: "date" }, { label: "Return date", type: "date" }, { label: "Travellers", type: "number" }],
  10: [{ label: "Typing service needed" }, { label: "Details" }],
  11: [{ label: "Destination" }, { label: "Trip length" }, { label: "Budget (AED)" }, { label: "Travellers", type: "number" }],
};

const FORM_COPY = {
  en: { title: "Make an enquiry", intro: "Tell us what you need and continue in WhatsApp.", name: "Your name", phone: "Your WhatsApp number", details: "Anything else we should know?", send: "Continue to WhatsApp", close: "Close" },
  ar: { title: "إرسال استفسار", intro: "أخبرنا بما تحتاجه ثم تابع عبر واتساب.", name: "الاسم", phone: "رقم واتساب", details: "تفاصيل إضافية", send: "المتابعة إلى واتساب", close: "إغلاق" },
  am: { title: "ጥያቄ ያቅርቡ", intro: "የሚፈልጉትን ይንገሩን እና በዋትስአፕ ይቀጥሉ።", name: "ስም", phone: "የዋትስአፕ ቁጥር", details: "ተጨማሪ ዝርዝሮች", send: "ወደ ዋትስአፕ ይቀጥሉ", close: "ዝጋ" },
};

const LANGUAGES = {
  en: {
    heroTitle1: "Cheap Flights", heroTitle2: "Dubai to Ethiopia", heroTitle3: "+ UAE Visa",
    heroSub: "Full-service travel agency + typing center in Al Rumailah 1, Ajman. Flights, hotels, UAE visa, tours, transport, insurance & typing for Ethiopian community in UAE.",
    servicesTitle: "Our Services", cta: "Book Now", allServices: "Complete Travel, Visa & Typing in Ajman, UAE",
    items: [
      { t: "Flight Services", d: "DXB-ADD, DXB-JED, business & group", seo: "flight booking Dubai Ethiopia" },
      { t: "Hotels & Stay", d: "Hotels, resorts, villas Dubai & Addis", seo: "hotel booking UAE" },
      { t: "Visa Services", d: "Tourist, visit, extension, tracking", seo: "UAE visa Ajman" },
      { t: "Travel Packages", d: "Flight+Hotel+Visa+Transfer", seo: "Dubai packages" },
      { t: "Transport", d: "Airport pickup, chauffeur, rental", seo: "airport transfer Dubai" },
      { t: "Tours & Safari", d: "Desert safari, city tours, cruises", seo: "desert safari" },
      { t: "Business Travel", d: "Corporate travel management", seo: "corporate travel Dubai" },
      { t: "Insurance", d: "Medical, baggage, cancellation", seo: "travel insurance" },
      { t: "Ethiopia Special", d: "UAE ↔ Ethiopia specialist", seo: "Ethiopian flights", hot: true },
      { t: "Typing Center", d: "Govt forms, Emirates ID, CV", seo: "typing center Ajman", hot: true },
      { t: "AI Assistant", d: "AI budget & itinerary generator", seo: "AI travel UAE", hot: true },
    ]
  },
  ar: {
    heroTitle1: "أرخص تذاكر", heroTitle2: "دبي إلى إثيوبيا", heroTitle3: "+ تأشيرة الإمارات",
    heroSub: "وكالة سفر ومركز طباعة متكامل في الرميلة 1، عجمان. حجز طيران، فنادق، تأشيرات الإمارات، جولات، توصيل، تأمين وخدمات الطباعة للجالية الإثيوبية.",
    servicesTitle: "خدماتنا", cta: "احجز الآن", allServices: "خدمات السفر والتأشيرات والطباعة في عجمان",
    items: [
      { t: "خدمات الطيران", d: "دبي-أديس، دبي-جدة، رجال أعمال", seo: "حجز طيران دبي إثيوبيا" },
      { t: "الفنادق", d: "فنادق ومنتجعات دبي وأديس", seo: "حجز فندق" },
      { t: "خدمات التأشيرات", d: "سياحية، زيارة، تمديد", seo: "تأشيرة الإمارات" },
      { t: "الباقات السياحية", d: "طيران+فندق+تأشيرة+توصيل", seo: "باقات سفر" },
      { t: "المواصلات", d: "توصيل مطار، سائق، تأجير", seo: "توصيل مطار" },
      { t: "الجولات", d: "سفاري صحراوي، جولات مدينة", seo: "سفاري دبي" },
      { t: "سفر الأعمال", d: "إدارة سفر الشركات", seo: "سفر شركات" },
      { t: "التأمين", d: "طبي، أمتعة، إلغاء", seo: "تأمين سفر" },
      { t: "إثيوبيا الخاص", d: "متخصص الإمارات ↔ إثيوبيا", seo: "طيران إثيوبي", hot: true },
      { t: "مركز الطباعة", d: "معاملات، هوية إماراتية", seo: "مركز طباعة", hot: true },
      { t: "المساعد الذكي", d: "حساب ميزانية ومسار", seo: "ذكاء اصطناعي", hot: true },
    ]
  },
  am: {
    heroTitle1: "ርካሽ በረራዎች", heroTitle2: "ዱባይ ወደ ኢትዮጵያ", heroTitle3: "+ የዩኤኢ ቪዛ",
    heroSub: "በአል ሩማይላህ 1፣ አጅማን የሚገኝ ሙሉ አገልግሎት የጉዞ ኤጀንሲ + የታይፒንግ ማዕከል። በረራ፣ ሆቴል፣ ቪዛ፣ ጉብኝት፣ ትራንስፖርት፣ ኢንሹራንስ እና የታይፒንግ አገልግሎት ለኢትዮጵያውያን ማህበረሰብ።",
    servicesTitle: "አገልግሎቶቻችን", cta: "አሁን ይመዝገቡ", allServices: "ሙሉ የጉዞ፣ ቪዛ እና ታይፒንግ በአጅማን UAE",
    items: [
      { t: "የበረራ አገልግሎት", d: "DXB-ADD, DXB-JED, ቢዝነስ", seo: "በረራ ዱባይ ኢትዮጵያ" },
      { t: "ሆቴሎች", d: "ሆቴሎች፣ ሪዞርቶች ዱባይ እና አዲስ", seo: "ሆቴል ዩኤኢ" },
      { t: "የቪዛ አገልግሎት", d: "ቱሪስት፣ ጉብኝት፣ ማራዘሚያ", seo: "ቪዛ ዩኤኢ" },
      { t: "የጉዞ ፓኬጆች", d: "በረራ+ሆቴል+ቪዛ+ትራንስፖርት", seo: "የጉዞ ፓኬጅ" },
      { t: "ትራንስፖርት", d: "ኤርፖርት መቀበያ፣ ኪራይ", seo: "ኤርፖርት ትራንስፖርት" },
      { t: "ጉብኝቶች", d: "የበረሃ ሳፋሪ፣ የከተማ ጉብኝት", seo: "ሳፋሪ ዱባይ" },
      { t: "የቢዝነስ ጉዞ", d: "የኮርፖሬት ጉዞ አስተዳደር", seo: "ቢዝነስ ጉዞ" },
      { t: "ኢንሹራንስ", d: "ሕክምና፣ ሻንጣ፣ መሰረዝ", seo: "ኢንሹራንስ" },
      { t: "ኢትዮጵያ ልዩ", d: "ዩኤኢ ↔ ኢትዮጵያ ስፔሻሊስት", seo: "የኢትዮጵያ በረራ", hot: true },
      { t: "ታይፒንግ ማዕከል", d: "የመንግስት ቅጾች፣ ኤሚሬትስ ID", seo: "ታይፒንግ Ajman", hot: true },
      { t: "AI ረዳት", d: "በጀት እና መርሃ ግብር", seo: "AI ጉዞ", hot: true },
    ]
  }
};

export default function Home() {
  const [lang, setLang] = useState<"en"|"ar"|"am">("en");
  const [content, setContent] = useState<SiteContent>(defaultData);
  const [selectedService, setSelectedService] = useState<{ id: number; name: string } | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [enquiryData, setEnquiryData] = useState<Record<string, string>>({});
  const L = LANGUAGES[lang];
  const isRTL = lang === "ar";
  useEffect(() => {
    fetch("/api/site-content", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) return;
        const result = await response.json();
        if (result.content) setContent(result.content);
      })
      .catch(() => undefined);
  }, []);
  const services = L.items.map((fallback, index) => {
    const editable = content.services[index];
    return {
      id: editable?.id ?? index + 1,
      t: lang === "en" && editable ? editable.name : fallback.t,
      d: lang === "en" && editable ? editable.description : fallback.d,
      seo: editable?.seo || fallback.seo,
      img: editable?.img || defaultData.services[index]?.img || "",
      price: editable?.price,
      hot: editable?.hot ?? fallback.hot,
      active: editable?.active ?? true,
    };
  }).filter((service) => service.active);
  const heroTitle1 = lang === "en" ? content.hero.title : L.heroTitle1;
  const heroTitle2 = lang === "en" ? content.hero.gold : L.heroTitle2;
  const heroTitle3 = lang === "en" ? content.hero.sub : L.heroTitle3;
  const heroSub = lang === "en" ? content.hero.desc : L.heroSub;
  const whatsappNumber = content.whatsapp.replace(/\D/g, "");
  const formCopy = FORM_COPY[lang];
  const enquiryFields = selectedService ? SERVICE_ENQUIRY_FIELDS[selectedService.id] ?? [] : [];
  const sendEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedService) return;
    const lines = [
      "Hello, Wanofii, I would like to make a booking through your website.",
      `Service: ${selectedService.name}`,
      `Name: ${customerName}`,
      `WhatsApp: ${customerPhone}`,
      ...enquiryFields.filter((field) => enquiryData[field.label]?.trim()).map((field) => `${field.label}: ${enquiryData[field.label].trim()}`),
      ...(enquiryData["Additional details"]?.trim() ? [`Additional details: ${enquiryData["Additional details"].trim()}`] : []),
    ];
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
  };
  return (
    <main className={`min-h-screen bg-black text-white ${isRTL?"rtl":"ltr"}`} dir={isRTL?"rtl":"ltr"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@type":"TravelAgency","name":"Wanofii Travel Ajman","alternateName":["وانوفي للسفر","ዋኖፊ ጉዞ"],"description": heroSub, "address":{"@type":"PostalAddress","streetAddress":"Al Rumailah 1","addressLocality":"Ajman","addressCountry":"AE"}, "areaServed":["AE","ET","SA"], "availableLanguage":["en","ar","am"]
      })}} />

      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur flex justify-between items-center p-4">
  <div className="flex items-center gap-2 text-xl font-black">
    <img src="/wanofii-mark-transparent.png" alt="Wanofii logo" className="h-12 w-[52px] object-contain" />
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
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, Wanofii, I would like to make a booking through your website.")}`}
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
            <h1 className="text-4xl md:text-7xl font-black leading-[0.9]">{heroTitle1}<br/><span className="text-[#D4AF37]">{heroTitle2}</span><br/>{heroTitle3}</h1>
            <h2 className="text-white/60 mt-4 max-w-2xl text-base md:text-lg">{heroSub}</h2>
            <div className="mt-6 flex gap-2 flex-wrap text-[11px]"><span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full">SEO: Dubai Addis flights</span><span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full">UAE visa Ajman</span><span className="bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-3 py-1 rounded-full">🇪🇹 Ethiopian Community</span></div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-black mb-1">{L.servicesTitle} <span className="text-[#D4AF37]">— {L.allServices}</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">
          {services.map((s,i)=>(
            <button key={s.id} type="button" onClick={() => { setSelectedService({ id: s.id, name: s.t }); setCustomerName(""); setCustomerPhone(""); setEnquiryData({}); }} className={`w-full text-left rounded-[1.8rem] overflow-hidden border group ${s.hot?"border-[#D4AF37]/50 bg-zinc-900":"border-white/10 bg-zinc-900/60"} hover:border-[#D4AF37]/60 transition cursor-pointer`}>
              <div className="relative h-44 overflow-hidden">
                <img src={s.img} alt={`${s.seo} Wanofii`} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute bottom-3 left-4 font-black text-lg">{s.t}</div>
                {s.hot && <div className="absolute top-3 right-3 bg-[#D4AF37] text-black text-[9px] font-black px-2 py-1 rounded-full">HOT</div>}
              </div>
              <div className="p-4"><p className="text-xs text-white/60">{s.d}</p>{s.price && <p className="text-sm font-bold text-[#D4AF37] mt-2">{s.price}</p>}<p className="text-[9px] text-white/20 mt-2 uppercase">{s.seo}</p><span className="inline-flex mt-4 rounded-full bg-green-600/20 px-3 py-2 text-xs font-bold text-green-300">{formCopy.send} →</span></div>
            </button>
          ))}
        </div>
      </section>

      {selectedService && <div className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4" role="presentation">
        <section role="dialog" aria-modal="true" aria-labelledby="enquiry-title" className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 bg-zinc-950 p-6 shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">{selectedService.name}</p><h2 id="enquiry-title" className="mt-1 text-2xl font-black">{formCopy.title}</h2><p className="mt-2 text-sm text-white/60">{formCopy.intro}</p></div>
            <button type="button" onClick={() => setSelectedService(null)} aria-label={formCopy.close} className="rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20">✕</button>
          </div>
          <form onSubmit={sendEnquiry} className="mt-6 space-y-4">
            <label className="block text-sm text-white/80">{formCopy.name}<input required autoComplete="name" value={customerName} onChange={(event) => setCustomerName(event.target.value)} className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#D4AF37]" /></label>
            <label className="block text-sm text-white/80">{formCopy.phone}<input required type="tel" autoComplete="tel" value={customerPhone} onChange={(event) => setCustomerPhone(event.target.value)} className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#D4AF37]" /></label>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{enquiryFields.map((field) => <label key={field.label} className="block text-sm text-white/80">{field.label}<input type={field.type ?? "text"} min={field.type === "number" ? 1 : undefined} value={enquiryData[field.label] ?? ""} onChange={(event) => setEnquiryData({ ...enquiryData, [field.label]: event.target.value })} className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#D4AF37]" /></label>)}</div>
            <label className="block text-sm text-white/80">{formCopy.details}<textarea rows={3} value={enquiryData["Additional details"] ?? ""} onChange={(event) => setEnquiryData({ ...enquiryData, "Additional details": event.target.value })} className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#D4AF37]" /></label>
            <button type="submit" className="w-full rounded-xl bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-500">{formCopy.send} ↗</button>
          </form>
        </section>
      </div>}

      <footer className="border-t border-white/10 py-6 text-center text-white/30 text-[11px]">WANO FII • Al Rumailah 1, Ajman • رحلات إثيوبيا • የኢትዮጵያ በረራዎች • +{whatsappNumber}</footer>
    </main>
  );
}
