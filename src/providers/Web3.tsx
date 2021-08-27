import { Logger } from '@oceanprotocol/lib'
import React, { createContext, ReactElement, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import Web3 from 'web3'
import Web3Modal from 'web3modal'

import { EthereumListsChain } from '../utils/web3'

interface Web3ProviderValue {
    web3: Web3
    web3Provider: any
    web3Modal: Web3Modal
    accountId: string
    networkId: number
    networkDisplayName: string
    networkData: EthereumListsChain
    block: number
    isTestnet: boolean
    web3Loading: boolean
    noMetamaskDownloaded: boolean
    connect: () => Promise<void>
    logout: () => Promise<void>
}

const web3ModalTheme = {
    background: 'var(--background-body)',
    main: 'var(--font-color-heading)',
    secondary: 'var(--brand-grey-light)',
    border: 'var(--border-color)',
    hover: 'var(--background-highlight)'
}

const providerOptions = {}
  
export const web3ModalOpts = {
    cacheProvider: true,
    providerOptions,
    theme: web3ModalTheme
}
  
  const Web3Context = createContext({} as Web3ProviderValue)
  
  function Web3Provider({ children }: { children: ReactNode }): ReactElement {
  
    const [web3, setWeb3] = useState<Web3>()
    const [web3Provider, setWeb3Provider] = useState<any>()
    const [web3Modal, setWeb3Modal] = useState<Web3Modal>()

    const [networkId, setNetworkId] = useState<number>()
    const [networkDisplayName, setNetworkDisplayName] = useState<string>()
    const [networkData, setNetworkData] = useState<EthereumListsChain>()
    const [block, setBlock] = useState<number>()
    const [isTestnet, setIsTestnet] = useState<boolean>()
    const [accountId, setAccountId] = useState<string>()
    const [web3Loading, setWeb3Loading] = useState<boolean>(true)

    const [noMetamaskDownloaded, setNoMetamaskDownloaded] = useState<boolean>()

    // ts
    // useEffect(() => {
    //   console.log(`=== PROVIDERS ===`)
    //   console.log(`web3 = `)
    //   console.log(web3)
    //   console.log(`web3Provider =`)
    //   console.log(web3Provider)
    //   console.log(`web3Modal = `)
    //   console.log(web3Modal)
    //   console.log(`web3Loading = `)
    //   console.log(web3Loading)
    // }, [web3, web3Provider, web3Modal, web3Loading])

    const connect = useCallback(async () => {
      // ts
      // console.log(`connecting...`)

      if (!web3Modal) {
        // ts
        // console.log(`!web3Modal`)
        
        setWeb3Loading(false)
        return
      }
      try {
        // ts
        // console.log(`TRYING...`)
        
        setWeb3Loading(true)
        Logger.log('[web3] Connecting Web3...')
  
        const provider = await web3Modal?.connect()
        setWeb3Provider(provider)
        // console.log(provider)
        
        const web3 = new Web3(provider)
        setWeb3(web3)
        Logger.log('[web3] Web3 created.', web3)

        // ts
        // console.log(`provider is defined`)
        // console.log(provider)
        // console.log(`web3 is defined`)
        // console.log(web3)

        if (provider === undefined && web3 === undefined) {
          setNoMetamaskDownloaded(true)
        } else {
          setNoMetamaskDownloaded(false)
        }

        const networkId = await web3.eth.net.getId()
        setNetworkId(networkId)
        Logger.log('[web3] network id ', networkId)
  
        const accountId = (await web3.eth.getAccounts())[0]
        setAccountId(accountId)
        Logger.log('[web3] account id', accountId)
      } catch (error) {
        // ts
        // console.log(`CATCHING... error = ${error}`)
        setNoMetamaskDownloaded(true)
        // Logger.error('[web3] Error: ', error.message)
      } finally {
        // ts
        // console.log(`CATCHING...`)
        setWeb3Loading(false)
      }
    }, [web3Modal])

    // TS
    // useEffect(() => {
    //   console.log(noMetamaskDownloaded)
    // }, [noMetamaskDownloaded])
  
    // -----------------------------------
    // Create initial Web3Modal instance
    // -----------------------------------
    useEffect(() => {
      // ts
      // console.log(web3Modal)
      if (web3Modal) return
  
      async function init() {
        // note: needs artificial await here so the log message is reached and output
        const web3ModalInstance = await new Web3Modal(web3ModalOpts)
        setWeb3Modal(web3ModalInstance)
        // ts
        // console.log(web3ModalInstance)
        Logger.log('[web3] Web3Modal instance created.', web3ModalInstance)
      }
      init()
    }, [connect, web3Modal])
  

    // -----------------------------------
    // Reconnect automatically for returning users
    // -----------------------------------
    useEffect(() => {
      if (!web3Modal?.cachedProvider) return
  
      async function connectCached() {
        Logger.log(
          '[web3] Connecting to cached provider: ',
          web3Modal.cachedProvider
        )
        await connect()
      }
      connectCached()
    }, [connect, web3Modal])
  
    // -----------------------------------
    // Get and set network metadata
    // -----------------------------------
    // useEffect(() => {
    //   if (!networkId) return
  
    //   const networkData = getNetworkData(networksList, networkId)
    //   setNetworkData(networkData)
    //   Logger.log('[web3] Network metadata found.', networkData)
  
    //   // Construct network display name
    //   const networkDisplayName = getNetworkDisplayName(networkData, networkId)
    //   setNetworkDisplayName(networkDisplayName)
  
    //   // Figure out if we're on a chain's testnet, or not
    //   setIsTestnet(networkData.network !== 'mainnet')
  
    //   Logger.log(`[web3] Network display name set to: ${networkDisplayName}`)
    // }, [networkId, networksList])
  

    // -----------------------------------
    // Get and set latest head block
    // -----------------------------------
    useEffect(() => {
      // ts
      // console.log(web3)
      if (!web3) return
  
      async function getBlock() {
        const block = await web3.eth.getBlockNumber()
        setBlock(block)
        Logger.log('[web3] Head block: ', block)
      }
      getBlock()
    }, [web3, networkId])
  
    // -----------------------------------
    // Logout helper
    // -----------------------------------
    async function logout() {
      web3Modal?.clearCachedProvider()
    }
  
    // -----------------------------------
    // Handle change events
    // -----------------------------------
    async function handleNetworkChanged(networkId: string) {
      Logger.log('[web3] Network changed', networkId)
      // const networkId = Number(chainId.replace('0x', ''))
      setNetworkId(Number(networkId))
    }
  
    async function handleAccountsChanged(accounts: string[]) {
      Logger.log('[web3] Account changed', accounts[0])
      setAccountId(accounts[0])
    }
  
    useEffect(() => {
      if (!web3Provider || !web3) return
  
      //
      // HEADS UP! We should rather listen to `chainChanged` exposing the `chainId`
      // but for whatever reason the exposed `chainId` is wildly different from
      // what is shown on https://chainid.network, in turn breaking our network/config
      // mapping. The networkChanged is deprecated but works as expected for our case.
      // See: https://eips.ethereum.org/EIPS/eip-1193#chainchanged
      //
      web3Provider.on('networkChanged', handleNetworkChanged)
      web3Provider.on('accountsChanged', handleAccountsChanged)
  
      return () => {
        web3Provider.removeListener('networkChanged', handleNetworkChanged)
        web3Provider.removeListener('accountsChanged', handleAccountsChanged)
      }
    }, [web3Provider, web3])
  
    return (
      <Web3Context.Provider
        value={{
          web3,
          web3Provider,
          web3Modal,
          accountId,
          networkId,
          networkDisplayName,
          networkData,
          block,
          isTestnet,
          web3Loading,
          noMetamaskDownloaded,
          connect,
          logout
        }}
      >
        {children}
      </Web3Context.Provider>
    )
  }
  
  // Helper hook to access the provider values
  const useWeb3 = (): Web3ProviderValue => useContext(Web3Context)
  
  export { Web3Provider, useWeb3, Web3ProviderValue, Web3Context }
  export default Web3Provider
  