import React, { ReactElement } from 'react'
import styles from './Footer.module.css'
import { Link } from "gatsby"

export default function Footer(): ReactElement {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img width="111px" src={`/data-union-logo-gray-white.svg`} alt="DataUnionlogo" />
        </div>
        <div className={styles.terms}>
          <ul>
            <li><Link to="/terms/">Terms of service</Link></li>
            <li><Link to="/privacy/">Privacy policy</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          <ul>
            <li><a href="https://t.me/dataunionapp">Telegram</a></li>
            <li><a href="https://discord.com/invite/Jm9C3yD8Sd">Discord</a></li>
            <li><a href="https://twitter.com/DataunionA">Twitter</a></li>
            <li><a href="https://github.com/DataUnion-app">Github</a></li>
          </ul>
        </div>
        <div className={styles.copyright}>
          © {year} DataUnion.app
        </div>
      </div>
    </footer>
  )
}
