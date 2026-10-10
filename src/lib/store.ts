export type EditableService = {
  id: number;
  name: string;
  description: string;
  seo: string;
  price: string;
  img: string;
  active: boolean;
  hot?: boolean;
};

export type SiteContent = {
  whatsapp: string;
  hero: {
    title: string;
    gold: string;
    sub: string;
    desc: string;
  };
  services: EditableService[];
};

export const defaultData: SiteContent = {
  whatsapp: "971569802812",
  hero: {
    title: "Cheap Flights",
    gold: "Dubai to Ethiopia",
    sub: "+ UAE Visa",
    desc: "Full-service travel agency + typing center in Al Rumailah 1, Ajman. Flights, hotels, UAE visa, tours, transport, insurance & typing for Ethiopian community in UAE.",
  },
  services: [
    { id: 1, name: "Flight Services", description: "DXB-ADD, DXB-JED, business & group", seo: "flight booking Dubai Ethiopia", price: "", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600", active: true },
    { id: 2, name: "Hotels & Stay", description: "Hotels, resorts, villas Dubai & Addis", seo: "hotel booking UAE", price: "", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600", active: true },
    { id: 3, name: "Visa Services", description: "Tourist, visit, extension, tracking", seo: "UAE visa Ajman", price: "", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600", active: true },
    { id: 4, name: "Travel Packages", description: "Flight+Hotel+Visa+Transfer", seo: "Dubai packages", price: "", img: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=600", active: true },
    { id: 5, name: "Transport", description: "Airport pickup, chauffeur, rental", seo: "airport transfer Dubai", price: "", img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600", active: true },
    { id: 6, name: "Tours & Safari", description: "Desert safari, city tours, cruises", seo: "desert safari", price: "", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600", active: true },
    { id: 7, name: "Business Travel", description: "Corporate travel management", seo: "corporate travel Dubai", price: "", img: "/business-travel.jpeg", active: true },
    { id: 8, name: "Insurance", description: "Medical, baggage, cancellation", seo: "travel insurance", price: "", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600", active: true },
    { id: 9, name: "Ethiopia Special", description: "UAE ↔ Ethiopia specialist", seo: "Ethiopian flights", price: "", img: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=600", active: true, hot: true },
    { id: 10, name: "Typing Center", description: "Govt forms, Emirates ID, CV", seo: "typing center Ajman", price: "", img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600", active: true, hot: true },
    { id: 11, name: "AI Assistant", description: "AI budget & itinerary generator", seo: "AI travel UAE", price: "", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600", active: true, hot: true },
  ],
};
