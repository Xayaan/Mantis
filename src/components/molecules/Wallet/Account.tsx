import { toDataUrl } from 'ethereum-blockies'
import React, { FormEvent } from 'react'

import Caret from '../../../images/caret.svg'
import { useWeb3 } from '../../../providers/Web3'
import { accountTruncate } from '../../../utils/web3'
import Loader from '../../atoms/Loader'
import Tooltip from '../../atoms/Tooltip/Tooltip'
import styles from './Account.module.css'
import Details from './Details'

export const Blockies = ({ account }: { account?: string | undefined }) => {
  if (!account) return (
    <img
      className={styles.blockies}
      src="https://cdn.iconscout.com/icon/free/png-512/metamask-2728406-2261817.png"
      alt="Blockies"
      aria-hidden="true"
    />
  )
  const blockies = toDataUrl(account)

  return (
    <img
      className={styles.blockies}
      src={blockies}
      alt="Blockies"
      aria-hidden="true"
    />
  )
}

// Forward ref for Tippy.js
// eslint-disable-next-line
const Account = React.forwardRef((props, ref: any) => {
  const { accountId, web3Modal, web3Loading, connect } = useWeb3()

  async function handleActivation(e: FormEvent<HTMLButtonElement>) {
    // prevent accidentially submitting a form the button might be in
    e.preventDefault()
    await connect()
  }

  // console.log(web3Modal)

  return web3Loading && !web3Modal ? (
    <Tooltip content={<Details />} trigger="click focus" disabled={false}>
      <button
        className={styles.button}
        aria-label="Account"
        ref={ref}
        onClick={(e) => e.preventDefault()}
      >
        <Blockies />
        <span className={styles.address}>
          <Loader message={"Loading web3..."} />
        </span>
        <Caret aria-hidden="true" />
      </button>
    </Tooltip>
  ) : accountId && web3Modal ? (
    
    <Tooltip content={<Details />} trigger="click focus" disabled={false}>
      <button
        className={styles.button}
        aria-label="Account"
        ref={ref}
        onClick={(e) => e.preventDefault()}
      >
        <Blockies account={accountId} />
        <span className={styles.address} title={accountId}>
          {accountTruncate(accountId)}
        </span>
        <Caret aria-hidden="true" />
      </button>
    </Tooltip>

  ) : !accountId && web3Modal && (
    
    <Tooltip content={<Details />} trigger="click focus" disabled={false}>
      <button
        className={`${styles.button}`}
        onClick={(e) => handleActivation(e)}
        ref={ref}
      >
        <Blockies />
        <span className={styles.address}>
          Connect Wallet
        </span>
        <Caret aria-hidden="true" />
      </button>
    </Tooltip>

  )
})

export default Account
