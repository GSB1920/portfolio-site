import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gaurav Singh Bais - Full-Stack Developer",
  description: "Passionate full-stack engineer with 3+ years of experience building scalable web applications and SaaS platforms.",
  keywords: ["Full-Stack Developer", "React", "Node.js", "MERN Stack", "TypeScript", "Next.js"],
  authors: [{ name: "Gaurav Singh Bais" }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: "Gaurav Singh Bais - Full-Stack Developer",
    description: "Passionate full-stack engineer crafting digital experiences with modern technologies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}