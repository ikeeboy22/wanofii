import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wanofii Travel Agency RAK | Cheap Flights Dubai to Ethiopia | UAE Visa & Umrah",
  description: "Full-service travel agency + typing center in Ras Al Khaimah UAE. Flights Dubai to Addis Ababa from AED 1299, UAE tourist visa, Umrah packages, hotels, desert safari, airport transfer, travel insurance for Ethiopian community.",
  keywords: [
    "travel agency Ras Al Khaimah",
    "flights Dubai Addis Ababa",
    "cheap flights Dubai Ethiopia",
    "UAE tourist visa RAK",
    "Umrah package UAE",
    "typing center Ras Al Khaimah",
    "Ethiopian community UAE",
    "desert safari Dubai booking",
    "airport transfer Dubai",
    "وانوفي للسفر",
    "ዋኖፊ ጉዞ"
  ],
  openGraph: {
    title: "Wanofii - Travel, Visa & Business Services RAK",
    description: "UAE ↔ Ethiopia specialist - 3000+ Ethiopians trust us",
    images: ["https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black">{children}</body>
    </html>
  );
}