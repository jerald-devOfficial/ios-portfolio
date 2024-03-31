import Image from 'next/image'

import { Raleway } from 'next/font/google'
import {
  BlogIcon,
  FacebookIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  MetaMaskIcon,
  PortfolioIcon
} from '@/components/svg-icons'
import Link from 'next/link'
import {
  DocumentArrowDownIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline'
import AuthButton from '@/components/AuthButton'

const raleway = Raleway({ subsets: ['latin'], display: 'swap' })

const footer = [
  {
    path: '/portfolio',
    icon: PortfolioIcon
  },
  {
    path: '/blog',
    icon: BlogIcon
  },
  {
    path: '/web3',
    icon: MetaMaskIcon
  },
  {
    path: '/contact-me',
    icon: MailIcon
  }
]

const externalLinks = [
  {
    icon: GitHubIcon,
    link: 'https://github.com/jerald-devOfficial'
  },
  {
    icon: LinkedInIcon,
    link: 'https://www.linkedin.com/in/jerald-baroro-562aab20a/'
  },
  {
    icon: FacebookIcon,
    link: 'https://www.facebook.com/spaueOfficial/'
  }
]

export default function Home() {
  return (
    <main className='grid grid-cols-2 min-h-screen w-full overflow-hidden'>
      <div className='block w-full h-full'>
        <div className='relative w-full h-full'>
          <Image
            src={'/images/me.png'}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            alt='Jerald Baroro'
            priority
            fill
            className='object-cover object-center opacity-90'
          />
        </div>
      </div>
      <div className='flex flex-col justify-between p-12'>
        <div className='w-full bg-white/65 ios-dock rounded-lg shadow-inner p-10 gap-y-16 flex flex-col mt-28 relative'>
          <div className='flex flex-col'>
            <h1
              className={`${raleway.className} uppercase text-[42px] font-bold tracking-[8px] leading-tight`}
            >
              Jerald Baroro
            </h1>
            <h3
              className={`uppercase text-base font-bold tracking-[2.3px] leading-tight ${raleway.className}`}
            >
              Full Stack JavaScript Developer
            </h3>
          </div>
          <p
            className={`text-[22px] font-semibold leading-[145%] ${raleway.className}`}
          >
            I am a dedicated full-stack web developer and software engineer
            architect, with over 4 years of hands-on experience in crafting
            beautiful, functional, and user-centered digital experiences.
          </p>

          <div className='block'>
            <div className='flex gap-x-4 float-right items-center'>
              <Link
                href={'/portfolio'}
                className='flex items-center gap-x-1 text-black hover:text-purple-700 group'
              >
                <span className='font-semibold text-xs group-hover:underline group-hover:underline-offset-2'>
                  Learn More
                </span>
                <ArrowTopRightOnSquareIcon className='font-bold stroke-2 h-3 w-3' />
              </Link>
              <Link
                href='/pdfs/updated-resume.pdf'
                target={'_blank'}
                download
                className='flex gap-x-1 items-center bg-black border px-6 py-3 rounded group'
              >
                <span className='text-xs font-semibold text-white group-hover:text-purple-500'>
                  Resume
                </span>
                <DocumentArrowDownIcon className='w-3 h-3 stroke-2 text-white group-hover:text-purple-500' />
              </Link>
            </div>
          </div>
        </div>
        <footer className='flex justify-center'>
          <div className='relative ios-dock overflow-hidden flex px-6 py-4 h-[100px] items-center justify-center gap-x-4 border-white/5 border border-solid bg-white/20 hover:bg-white/30 rounded-[30px] w-fit'>
            {footer.map((item) => (
              <Link href={`${item.path}`} key={item.path}>
                <item.icon className='rounded-[12px] h-[50px] w-[50px] hover:ring-green-500 hover:ring-solid hover:ring' />
              </Link>
            ))}

            {externalLinks.map((link) => (
              <a
                href={link.link}
                key={link.link}
                target='_blank'
                rel='noopener noreferrer'
              >
                <link.icon className='cursor-pointer rounded-[12px] h-[50px] w-[50px] hover:ring-green-500 hover:ring-solid hover:ring' />
              </a>
            ))}
            <AuthButton />
          </div>
        </footer>
      </div>
    </main>
  )
}
