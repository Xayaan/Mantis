import { Link } from 'gatsby'
import React, { ReactElement } from 'react'
import { getInjectedProviderName } from 'web3modal'

import { useWeb3 } from '../../../providers/Web3'
import { Button } from '../../atoms/Button'
import styles from './Details.module.css'

export default function Details({
  location
}: {
  location?: string
}): ReactElement {
  const { 
    // balance, 
    web3Modal,
    connect, 
    logout,
    accountId
  } = useWeb3()
  // const { locale } = useUserPreferences()

  return (
    <>
    {location === 'help' ? (
      <div className={styles.menuDetails}>
        <div className={styles.menuDetailsGridSection}>
          <Link to={'/tutorials'}>
            Tutorials and FAQ
          </Link>
        </div>
      </div>
    ) : location === 'info' ? (
      <div className={styles.menuDetails}>
        <div className={styles.menuDetailsGridSection}>
          <Link to={'/dashboard'}>
            App Stats
          </Link>
        </div>
        <div className={styles.menuDetailsGridSection}>
          <Link to={'/myDashboard'}>
            My Stats
          </Link>
        </div>
        <div className={styles.menuDetailsGridSection}>
          <Link to={'/bounties'}>
            Data Bounties
          </Link>
        </div>
      </div>
    ) : location === 'start earning' ? (
      <div className={styles.menuDetails}>
        <div className={styles.menuDetailsGridSection}>
          <Link to={'/upload'}>
            Upload
          </Link>
        </div>
        <div className={styles.menuDetailsGridSection}>
          <Link to={'/verify'}>
            Verify
          </Link>
        </div>
        <div className={styles.menuDetailsGridSection}>
          <Link to={'/annotate'}>
            Annotate
          </Link>
        </div>
        <div className={styles.menuDetailsGridSection}>
          <Link to={'/playAI'}>
            Dupe the AI
          </Link>
        </div>
      </div>
    ) : (
      <div className={styles.details}>
      <ul>
        {/* {Object.entries(balance).map(([key, value]) => (
          <li className={styles.balance} key={key}>
            {key && (<span className={styles.symbol}>{key.toUpperCase()}</span>)}{' '}
            {formatCurrency(Number(value), '', locale, false, {
              significantFigures: 4
            })}
          </li>
        ))} */}

        {!accountId && (
          <>
           <li className={styles.actions}>
           <span title="Connected provider">Download</span>
           <Button
              style="text"
              size="small"
              onClick={() => {
                typeof window !== 'undefined' && 
                window.open('https://metamask.io/download.html', '_blank')
              }}
            >
              Download Metamask
            </Button>
          </li>
          <li className={styles.actions}>
          <span title="Connected provider">Connect Wallet</span>
          <Button
              style="text"
              size="small"
              onClick={() => {
                connect()
                // clearAuth()
                // location.reload()
              }}
            >
              Connect Wallet
            </Button>
          </li>
          </>
        )}

        <li className={styles.actions}>
          <span title="Tutorials">Home</span>
          <Button size={'small'} style="text" to={'/'}> Home</Button>
        </li>    
        <li className={styles.actions}>
          <span title="Tutorials">Tutorials & FAQ</span>
          <Button size={'small'} style="text" to={'/tutorials'}> Tutorials & FAQ</Button>
        </li>
        <li className={styles.actions}>
          <span title="App Statistics">App Statistics</span>
          <Button size={'small'} style="text" to={'/dashboard'}> App Stats</Button>
        </li>
        <li className={styles.actions}>
          <span title="Data Bounties">Data Bounties</span>
          <Button size={'small'} style="text" to={'/bounties'}> Data Bounties</Button>
        </li>

        {accountId && (
          <>
          <li className={styles.actions}>
            <span title="Upload">Upload</span>
            <Button size={'small'} style="text" to={'/upload'}> Upload Images </Button>
          </li>
          
          <li className={styles.actions}>
            <span title="Verify">Verify</span>
            <Button size={'small'} style="text" to={'/verify'}> Verify Images</Button>
          </li>
          
          <li className={styles.actions}>
            <span title="Annotate">Annotate</span>
            <Button size={'small'} style="text" to={'/annotate'}> Annotate Images</Button>
          </li>
          
          <li className={styles.actions}>
            <span title="My account">My Dashboard</span>
            <Button size={'small'} style="text" to={'/myDashboard'}> My Stats</Button>
          </li>
          
          <li className={styles.actions}>
          <span title="Connected provider">{getInjectedProviderName()}</span>
            <Button
              style="text"
              size="small"
              onClick={() => {
                logout()
                if (typeof window !== 'undefined') 
                  window.location.reload()
              }}
            >
              Disconnect
            </Button>
          </li>
          </>
        )}

      </ul>
    </div>
    )}
    </>    
  )
}
