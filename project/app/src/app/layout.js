//root layout file
import './globals.scss'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { Poppins } from 'next/font/google';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loading from './loading';
import Provider from '@/SessionProvider';

//font config
const poppins = Poppins({ weight: "400", subsets: ['latin'] })

export const metadata = {
  title: 'Nature Forum',
  description: 'A forum for your nature-know-how needs.',
}

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body className={poppins.className}>
        <main className="flex min-h-screen flex-col items-center">
          <Provider>
            <Navbar />
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
            <Footer />
          </Provider>
        </main>
      </body>
    </html>

  )
}

