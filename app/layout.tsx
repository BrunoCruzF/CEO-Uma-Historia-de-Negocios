import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CEO — Uma História de Negócios",
  description: "Construa empresas, negocie com pessoas, enfrente rivais, venda negócios e crie seu legado.",
  metadataBase: new URL("https://ceo-historia.sites.openai.com"),
  openGraph: { title: "CEO — Uma História de Negócios", description: "Toda empresa começa com uma promessa.", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "CEO — Uma História de Negócios", description: "Construa. Venda. Recomece.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
