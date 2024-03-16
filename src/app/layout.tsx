import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/components/AuthProvider'

const montserrat = Montserrat({ subsets: ['latin'], display: 'swap' })

const title = 'JB - Awesome Portfolio Built with Next.js'

export const metadata: Metadata = {
  title: title,
  description:
    "Explore Jerald's Next.js developer portfolio and discover the latest web app projects and software engineering articles.",
  twitter: {
    images: {
      url: 'https://www.jeraldbaroro.xyz/images/logo.png',
      alt: "JB - Jerald Baroro's Next.js portfolio",
      type: 'image/png',
      width: 300,
      height: 300
    }
  },
  openGraph: {
    title: title,
    images: {
      url: 'https://www.jeraldbaroro.xyz/images/logo.png',
      alt: "JB - Jerald Baroro's Next.js portfolio",
      type: 'image/png',
      width: 300,
      height: 300
    },
    siteName: title,
    description:
      "Explore Jerald's Next.js developer portfolio and discover the latest web app projects and software engineering articles."
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${montserrat.className} bg-ios-wallpaper bg-no-repeat bg-cover object-cover object-center min-h-screen overflow-hidden`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
