import '@styles/globals.css'
import { AuthProvider } from '@context/AuthContext'
import Navbar from '@components/Layout/Navbar/Navbar'
import Footer from '@components/Layout/Footer/Footer'
import { Suspense } from 'react'
import Loading from './loading'

export const metadata = {
    title: "Djoby",
    description: "Trouver facilement du travaille ou de l'aide directement grace aux offres de travaille de particuliers a particulier.",
}

const RootLayout = ({ children }) => {
  return (
    <html lang='fr'>
        <body>
              <AuthProvider>
                <main className='app'>
                  <Suspense fallback={<Loading />}>
                    <Navbar />
                    {children}
                    <Footer />
                  </Suspense>

                </main>
              </AuthProvider>
        </body>
    </html>
  )
}

export default RootLayout