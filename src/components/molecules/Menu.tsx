import loadable from '@loadable/component'
import { Link } from 'gatsby'
import React, { ReactElement } from 'react'

import { Button } from '../atoms/Button'
import Container from '../atoms/Container'
import Tooltip from '../atoms/Tooltip/Tooltip'
import styles from './Menu.module.css'
import { UserPreferences } from './UserPreferences'
import Details from './Wallet/Details'

const Wallet = loadable(() => import('./Wallet'))

export default function Menu(): ReactElement {
  return (
    <nav className={styles.menu}>
      <Container>
        <Link to="/" className={styles.logoUnit}>
          <img width="70px" src={`/DataUnion.svg`} alt="DataUnionlogo" />
        </Link>

        <div className={`${styles.navmenu}`}>
          <Button size={'small'} className={`${styles.button} ${styles.initial} ${styles.respond}`} to={"/tutorials"}>
            Help
          </Button>
          
          {/**************************************************/}
          {/** USE THIS VERSION WHEN YOU MAKE THE NEW LINKS **/}
          {/**************************************************/}
          {/* <Tooltip content={<Details location="help"/>} trigger="click focus" disabled={false}>
            <Button size={'small'} className={`${styles.button} ${styles.initial} ${styles.respond}`}>
              Help
            </Button>
          </Tooltip> */}

          <Tooltip content={<Details location="info"/>} trigger="click focus" disabled={false}>
            <Button size={'small'} className={`${styles.button} ${styles.initial} ${styles.respond}`}>
              Info
            </Button>
          </Tooltip>

          <Tooltip content={<Details location="start earning"/>} trigger="click focus" disabled={false}>
            <Button size={'small'} className={`${styles.button} ${styles.initial} ${styles.respond}`}>
              Start Earning
            </Button>
          </Tooltip>

          <ul className={styles.navigation}>
            <li>
              <Wallet />
            </li>
          </ul>

          <UserPreferences />
        </div>
        
      </Container>
    </nav>
  )
}
