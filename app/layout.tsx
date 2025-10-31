import type { Metadata } from "next";
import { Noto_Sans_Lao } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

// โหลดฟอนต์ภาษาลาว
const laoFont = Noto_Sans_Lao({
  variable: "--font-lao",
  subsets: ["lao"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "My Web Nextjs",
  description: "Hi Hello",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lo">
      <body className={`${laoFont.variable} antialiased flex flex-col min-h-screen`}>

     
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
