import "./globals.css";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Header from "./components/Header";
import PageTransition from "./components/PageTransition";
import StairTransition from "./components/StairTransition";
import Link from "next/link";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "700"], // Simplifica pesos si no los usas todos
});

export const metadata: Metadata = {
  title: "Token Comic",
  description: "Web3 Your Comic, mint the World!!!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} font-mono bg-primary min-h-screen`}>
        <h1>AQUJIEUIUJHSDJIUKKJHGBSFCVJGBFDV</h1>
        <StairTransition />
        <h1>hola</h1>
        <Header />
        
        <PageTransition>
          <main className="flex-1 container mx-auto px-4">
            {children}
          </main>
        </PageTransition>
        
        {/* Footer global */}
        <div className="text-center py-4 text-accent hover:text-accent-hover">
          <Link href="https://www.pablodrum.xyz">
            Created By pablodrum
          </Link>
        </div>
      </body>
    </html>
  );
}