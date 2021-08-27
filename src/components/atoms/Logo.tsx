import React, { ReactElement } from 'react'

import LogoEle from '../../images/DataUnion.svg'
import styles from './Logo.module.css'

export default function Logo(): ReactElement {
  return  (
    <div className={styles.logo}>
      <LogoEle />
    </div>
  )
}
