import { ReactNode } from 'react'
import { Raleway } from 'next/font/google'
import { Metadata } from 'next'
import Link from 'next/link'
import { BlogIcon, HomeIcon, MailIcon, PortfolioIcon } from '../svg-icons'
import { usePathname } from 'next/navigation'
import AuthButton from '../AuthButton'

const raleway = Raleway({ subsets: ['latin'], display: 'swap' })

const title = 'JB - Awesome Portfolio Built with Next.js | Showcase'

export const metadata: Metadata = {
  title: title,
  description: `Discover Jerald's portfolio and his latest web app projects, a Next.js developer with expertise in React.js, Next.js, and full-stack development. Browse software engineering articles and tutorials for tips on creating web applications.`,
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
    description: `Discover Jerald's portfolio and his latest web app projects, a Next.js developer with expertise in React.js, Next.js, and full-stack development. Browse software engineering articles and tutorials for tips on creating web applications.`
  }
}

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  const pathname = usePathname()

  const footer = [
    {
      path: '/',
      icon: HomeIcon
    },
    {
      path: '/portfolio',
      icon: PortfolioIcon
    },
    {
      path: '/blog',
      icon: BlogIcon
    },
    {
      path: '/contact-me',
      icon: MailIcon
    }
  ]

  return (
    <div className='flex flex-col items-center justify-between py-8 h-screen'>
      <Link
        href={'/'}
        className='flex w-fit flex-col border border-solid border-white bg-white/20 py-4 px-5 items-center justify-center overflow-hidden mx-auto rounded-lg text-white shadow-2xl hover:bg-white/50'
      >
        <h1
          className={`${raleway.className} uppercase text-[42px] font-semibold tracking-[8px]`}
        >
          Jerald Baroro
        </h1>
        <h3
          className={`${raleway.className} uppercase text-base font-normal tracking-[2.3px]`}
        >
          Full Stack JavaScript Developer
        </h3>
      </Link>
      {children}
      <footer className='relative ios-dock overflow-hidden flex px-6 py-4 h-[100px] items-center justify-center gap-x-4 border-white/5 border border-solid bg-white/20 rounded-[30px] hover:bg-white/30'>
        {footer.map((item) => (
          <Link
            href={`${item.path}`}
            key={item.path}
            className='flex flex-col items-center justify-center gap-y-1.5 cursor-pointer'
          >
            <div className='block relative'>
              {pathname === item.path && (
                <span className='absolute -top-2 -right-2 h-5 w-5 z-10 bg-green-500 rounded-full border border-white border-solid animate-pulse' />
              )}
              <item.icon
                className='border-white border border-solid rounded-[12px]
                 h-[50px] w-[50px] hover:ring-green-500 hover:border-transparent hover:ring'
              />
            </div>
          </Link>
        ))}
        <AuthButton />
      </footer>
    </div>
  )
}

export default Layout
