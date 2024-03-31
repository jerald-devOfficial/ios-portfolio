'use client'

import Layout from '@/components/layouts'
import EtherScan from '@/components/pages/web3/EtherScan'
import MyMetaMask from '@/components/pages/web3/MyMetaMask'
import YourMetaMask from '@/components/pages/web3/YourMetaMask'
import { EtherscanLogo, MetaMaskDark, MetaMaskLogo } from '@/components/svgs'
import React, { useState } from 'react'

const sides = [
  {
    title: 'My MetaMask',
    logo: MetaMaskLogo,
    component: MyMetaMask
  },
  {
    title: 'Your MetaMask',
    logo: MetaMaskDark,
    component: YourMetaMask
  },
  {
    title: 'EtherScan Transactions',
    logo: EtherscanLogo,
    component: EtherScan
  }
]

const Web3Page = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0)

  const ActiveLogo = sides[activeCategory].logo
  const ActiveComponent = sides[activeCategory].component

  return (
    <Layout>
      <div className='w-[700px] flex rounded-xl shadow-xl flex-grow mt-16 mb-14 overflow-hidden h-full bg-white/80'>
        <section className='w-[300px] h-full flex flex-col'>
          <div className='border-b border-[#3C3C43]/36 border-solid h-16 hover:bg-white/90 flex justify-start items-center px-4 shadow-md shadow-gray-200'>
            <ActiveLogo className='h-10 w-auto' />
          </div>
          <div className='mt-6 mx-4 pl-4 rounded-xl border border-solid border-gray-200'>
            {sides.map((item, index) => (
              <button
                key={item.title}
                className={`flex justify-between py-3.5 pr-3 items-center w-full group ${
                  index < sides.length - 1
                    ? 'border-b border-gray-200 border-solid'
                    : ''
                }`}
                onClick={() => setActiveCategory(index)}
              >
                <h4
                  className={`text-base ${
                    activeCategory === index
                      ? 'text-blue-600 font-medium group-hover:text-blue-400'
                      : 'font-normal text-black group-hover:text-gray-500'
                  }`}
                >
                  {item.title}
                </h4>
              </button>
            ))}
          </div>
        </section>
        <ActiveComponent />
      </div>
    </Layout>
  )
}

export default Web3Page
