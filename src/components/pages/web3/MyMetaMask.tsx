'use client'

import { EthereumIcon } from '@/components/svg-icons'
import {
  copyAddressToClipboard,
  fetchExchangeRateFromAPI,
  hashShortener,
  toFixedFour
} from '@/utils'
import { Inter } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import { BiSolidCopy } from 'react-icons/bi'
import { HiOutlineEllipsisVertical } from 'react-icons/hi2'
import { RiLineChartLine } from 'react-icons/ri'
import Web3 from 'web3'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

const MyMetaMask = () => {
  const [account, setAccount] = useState<string | null>(null)
  const [accountName] = useState<string>('Account 1')
  const [ethBalanceInEther, setEthBalanceInEther] = useState<string | null>(
    null
  )
  const [ethBalanceInUSD, setEthBalanceInUSD] = useState<string | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const [selectedTab, setSelectedTab] = useState(0)

  const tabs = [
    {
      title: 'Tokens',
      tokens: [
        {
          name: 'Ethereum',
          abbr: 'ETH',
          balance: ethBalanceInEther,
          balanceInUSD: ethBalanceInUSD
        }
      ],
      enabled: true
    },
    {
      title: 'NFTs',
      enabled: false
    },
    {
      title: 'Activity',
      enabled: false
    }
  ]

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/metamask')
        if (!response.ok) {
          throw new Error('Failed to fetch account info')
        }
        const data = await response.json()
        setAccount(data.account)
        setEthBalanceInEther(data.ethBalanceInEther)
        setEthBalanceInUSD(data.ethBalanceInUSD)
      } catch (error) {
        console.error('Error fetching account info:', error)
        setError('Error fetching account info')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAccountInfo()
  }, [])

  return (
    <section className='flex-grow h-full bg-white'>
      <div className='h-16 w-full shadow-md shadow-gray-200 flex justify-between items-center px-4'>
        {error && !isLoading && (
          <p className='text-xs font-bold text-rose-600'>{error}</p>
        )}
        {isLoading ? (
          <p className='text-xs font-bold text-yellow-600 text-center w-full'>
            Fetching data from WalletConnect and MetaMask...
          </p>
        ) : account ? (
          <>
            <span className='rounded-full bg-gray-100 border border-solid border-gray-200 py-2 px-4'>
              <EthereumIcon className='h-3 w-3' />
            </span>
            <div className='flex flex-col items-center gap-y-1.5'>
              <span className='text-xs font-bold'>{accountName}</span>
              <div className='flex items-center gap-x-1'>
                <span className='text-xs font-medium text-gray-600'>
                  {hashShortener(account!, 6)}
                </span>
                <BiSolidCopy
                  onClick={() => copyAddressToClipboard(account!)}
                  size={16}
                  className='text-gray-600'
                />
              </div>
            </div>
            <HiOutlineEllipsisVertical size={20} />
          </>
        ) : null}
      </div>
      <div className='flex flex-col px-4 py-6'>
        {error && <p className='text-xs font-bold text-rose-600'>{error}</p>}
        {isLoading ? (
          <p className='text-xs font-bold text-yellow-600 text-center w-full'>
            Fetching data from WalletConnect and MetaMask...
          </p>
        ) : account ? (
          <div className='my-4 flex flex-col items-center gap-y-10'>
            <h3 className={`font-medium text-3xl ${inter.className}`}>
              ${ethBalanceInUSD} USD
            </h3>
            <div className='grid place-items-center gap-1'>
              <span className='bg-sky-600 rounded-full p-2'>
                <RiLineChartLine className='text-white' size={20} />
              </span>
              <span className='text-xs text-black font-medium'>Portfolio</span>
            </div>
            <div className='flex flex-col gap-y-4 w-full'>
              <div className='grid grid-cols-3'>
                {tabs.map((tab, index) => (
                  <div
                    className={`${
                      selectedTab === index
                        ? 'border-b-2 border-solid border-sky-600'
                        : ''
                    } ${
                      tab.enabled
                        ? 'cursor-pointer'
                        : 'pointer-events-none cursor-not-allowed'
                    } flex items-center justify-center pb-1.5`}
                    key={tab.title}
                  >
                    <span
                      className={`text-xs ${inter.className} ${
                        selectedTab === index ? 'text-sky-600' : ''
                      }`}
                    >
                      {tab.title}
                    </span>
                  </div>
                ))}
              </div>
              {tabs[selectedTab].tokens?.map((token) => (
                <div
                  className={`${inter.className} text-xs font-normal text-gray-800 flex items-center justify-between`}
                  key={token.abbr}
                >
                  <div className='flex gap-x-2 items-start'>
                    <div className='rounded-full block bg-gray-200 p-1.5 relative'>
                      <EthereumIcon className='h-3.5 w-3.5' />
                      <div className='-top-1 -right-0 absolute rounded-full bg-gray-50 p-0.5'>
                        <EthereumIcon className='h-2 w-2' />
                      </div>
                    </div>
                    <div className='flex flex-col gap-y-1'>
                      <span>{token.abbr}</span>
                      <span>{token.name}</span>
                    </div>
                  </div>

                  <div className='flex flex-col items-end gap-y-1'>
                    <span>
                      {toFixedFour(token.balance || '0')} {token.abbr}
                    </span>
                    <span>${token.balanceInUSD} USD</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default MyMetaMask
