'use server'

import { fetchExchangeRateFromAPI } from "@/utils"
import { NextResponse } from "next/server"
import Web3 from 'web3'

export async function GET() {
    try {
        const web3 = new Web3(process.env.INFURA_ID) // Initialize Web3 with Infura provider
        const metamaskAddress = process.env.METAMASK_ADDRESS
    
        // Fetch ETH balance
        const ethBalance = await web3.eth.getBalance(metamaskAddress!)
        const ethBalanceInEther = web3.utils.fromWei(ethBalance, 'ether')
    
        // Fetch exchange rate for ETH to USD
        const ethToUSD = await fetchExchangeRateFromAPI('ethereum', 'usd')
        const ethBalanceInUSD = (parseFloat(ethBalanceInEther) * ethToUSD).toFixed(2)
    
        return new NextResponse(JSON.stringify({account: metamaskAddress,
            ethBalanceInEther,
            ethBalanceInUSD}), { status: 200 });
      } catch (error) {
        console.error('Error fetching account info:', error)
        return new NextResponse('Error fetching account info', { status: 500 });
      }
}
