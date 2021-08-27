import React, { ReactElement } from 'react'

import styles from './App.module.css'
import Footer from './organisms/Footer'
import Header from './organisms/Header'

export default function App({
  children,
  ...props
}: {
  children: ReactElement
}): ReactElement {

  return (
    <div className={styles.app}>
      <Header />

        <main className={styles.main}>
          {children}
        </main>

      <Footer />
    </div>
  )
}
