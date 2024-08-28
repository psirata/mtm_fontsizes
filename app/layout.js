import { Inter } from "next/font/google";
import localFont from 'next/font/local'

import "./globals.css";
const myFont = localFont({ src: '/fonts/MTMDisplay-Regular.otf' })
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MTM Min Font Sizes",
  description: "MTM Min Font Sizes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={myFont.className}>{children}</body>
    </html>
  );
}
