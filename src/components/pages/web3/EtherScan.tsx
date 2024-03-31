'use client'

import { EtherScanSM } from '@/components/svgs'
import { hashShortener, toFixedFour } from '@/utils'
import { Inter } from 'next/font/google'
import React, { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import Web3 from 'web3'
const inter = Inter({ subsets: ['latin'], display: 'swap' })

const EtherScan = () => {
  const [transaction, setTransaction] = useState<any>(null)
  const [transactionHash, setTransactionHash] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const fetchTransaction = async () => {
    try {
      setIsLoading(true)
      if (
        typeof window !== 'undefined' &&
        (window as any).ethereum !== 'undefined'
      ) {
        // Initialize web3 with MetaMask provider
        const web3 = new Web3((window as any).ethereum)
        // Request account access if needed
        await (window as any).ethereum.enable()

        // Fetch transaction details
        const transaction = await web3.eth.getTransaction(transactionHash)
        setTransaction(transaction)
      } else {
        console.error('MetaMask extension not detected.')
        setError('MetaMask browser extension not detected, please install.')
      }
    } catch (error) {
      console.error('Error fetching transaction:', error)
      setError(`Error from fetching transaction: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setTransaction(null)
    setTransactionHash('')
    setError(null)
  }

  return (
    <section className='h-full bg-white flex flex-col w-full'>
      <div className='h-16 w-full shadow-md shadow-gray-200 flex justify-start items-end px-4 pb-2'>
        <EtherScanSM />
      </div>
      <div className='flex flex-col flex-grow gap-y-4'>
        <div className='h-[100px] bg-gradient-to-b from-eth-bg-top to-eth-bg-bottom relative overflow-hidden w-full flex'>
          <div className='absolute inset-0 h-[inherit] wave px-4 flex flex-grow justify-center items-center w-full'>
            <div className='flex w-full h-8 bg-white rounded-md p-1 gap-x-2'>
              <input
                type='text'
                className={`${inter.className} text-sm flex-1 focus:rounded-md p-2 focus:outline-gray-400 text-black`}
                value={transactionHash}
                onChange={(e) => setTransactionHash(e.target.value)}
                placeholder='Enter Transaction Hash'
              />
              <button
                className='bg-sky-500 hover:bg-sky-600 text-white font-semibold p-2 rounded-md flex items-center justify-center'
                onClick={fetchTransaction}
              >
                <IoSearchSharp />
              </button>
            </div>
          </div>
        </div>
        {error && (
          <div className='flex flex-col justify-between h-full p-4'>
            <p className='text-xs font-bold text-rose-600'>{error}</p>
            <button
              className='rounded-md flex items-center justify-center px-2 py-1 text-sm text-white bg-blue-600 font-medium'
              onClick={handleClear}
            >
              New Transaction Search
            </button>
          </div>
        )}
        {isLoading ? (
          <p className='text-xs font-bold text-yellow-600 text-center w-full'>
            Fetching data from https://etherscan.io...
          </p>
        ) : transaction ? (
          <div className='flex justify-between flex-col h-full p-4'>
            <div className={`${inter.className} flex flex-col gap-y-2`}>
              <h4 className='text-base font-medium'>Transcation Details</h4>
              <div className='flex gap-x-4 text-sm'>
                <div className='flex flex-col text-gray-500'>
                  <span className='text-nowrap'>Transaction Hash:</span>
                  <span>From:</span>
                  <span>To:</span>
                  <span>Value:</span>
                </div>

                <div className='flex flex-col flex-1'>
                  <span>{hashShortener(transaction.blockHash, 10)}</span>
                  <span>{hashShortener(transaction.from, 10)}</span>
                  <span>{hashShortener(transaction.to, 10)}</span>
                  <span>
                    {toFixedFour(
                      Web3.utils.fromWei(transaction.value.toString(), 'ether')
                    )}{' '}
                    ETH
                  </span>
                </div>
              </div>
            </div>
            <button
              className='rounded-md flex items-center justify-center px-2 py-1 text-sm text-white bg-blue-600 font-medium'
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default EtherScan
