import { Geist, Geist_Mono, Instrument_Sans, Instrument_Serif } from "next/font/google";

import { Providers } from "@/components/providers";
import "@quibly/ui/globals.css";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const fontInstrumentalSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],

  variable: "--font-instrumental-serif",
});

const fontInstrumentalSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400"],

  variable: "--font-instrumental-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} ${fontInstrumentalSerif.variable} ${fontInstrumentalSans.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
