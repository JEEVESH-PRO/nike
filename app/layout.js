import './globals.css'
import CartProvider from '@/components/CartProvider'
import WishlistProvider from '@/components/WishlistProvider'
import TransitionProvider from '@/components/TransitionProvider'
import CustomCursor from '@/components/CustomCursor'
import Preloader from '@/components/Preloader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import BackgroundEffects from '@/components/BackgroundEffects'

export const metadata = {
  title: 'NIKE — Forged in Movement',
  description: 'A cinematic brand experience. Every stitch, considered. Engineered for movement.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&family=Oswald:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col bg-dark text-white antialiased">
        <CartProvider>
          <WishlistProvider>
            <BackgroundEffects />
            <CustomCursor />
            <Preloader />
            <Header />
            <SmoothScrollProvider>
              <TransitionProvider>{children}</TransitionProvider>
            </SmoothScrollProvider>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}
