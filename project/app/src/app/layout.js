//root layout file

import './globals.scss'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { Poppins } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Toolbar from '@/components/Toolbar';
import Footer from '@/components/Footer';
//font config
const poppins = Poppins({ weight: "400", subsets: ['latin'] })
//metadata for head and SEO
export const metadata = {
  title: 'Nature Forum',
  description: 'A forum for your nature-know-how needs.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className="flex min-h-screen flex-col items-center">
          <Navbar />
          <Toolbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
