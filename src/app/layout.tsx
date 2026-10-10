import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wanofii Travel Agency Ajman | Cheap Flights Dubai to Ethiopia | UAE Visa",
  description: "Full-service travel agency + typing center in Al Rumailah 1, Ajman, UAE. Flights Dubai to Addis Ababa from AED 1299, UAE tourist visa, hotels, desert safari, airport transfer and travel insurance for Ethiopian community.",
  keywords: [
    "travel agency Ajman",
    "flights Dubai Addis Ababa",
    "cheap flights Dubai Ethiopia",
    "UAE tourist visa Ajman",
    "typing center Ajman",
    "Ethiopian community UAE",
    "desert safari Dubai booking",
    "airport transfer Dubai",
    "وانوفي للسفر",
    "ዋኖፊ ጉዞ"
  ],
  openGraph: {
    title: "Wanofii - Travel, Visa & Business Services Ajman",
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
