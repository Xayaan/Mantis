import React, { ReactElement, ReactNode, useState } from "react";

import styles from './FAQCollapser.module.css'

type FAQCollapserProps = {
  title: string | ReactNode
  children: ReactNode
  keyValue?: string
}

export function FAQCollapser({
  title,
  children,
  keyValue
}: FAQCollapserProps): ReactElement {

  const [checked, setChecked] = useState<boolean>(true)

  // console.log(`RENDERING`)
  // console.log(`=== CLICKING FAQ ===`)
  // console.log(`checked = ${checked}`)

  const check = () => {
    if (checked) {
      setChecked(false)
    } else {
      setChecked(true)
    }
  }

  return (
    <div key={keyValue} className={styles.wrapCollapsible} id={keyValue}>
      
      <input 
        key={keyValue} 
        id="collapsible" 
        className={styles.toggle} 
        type="checkbox" 
        style={{display: "none"}} 
        onChange={() => check()} 
        checked
        // checked={checked}
      />
      <label htmlFor="collapsible" className={styles.lblToggle}>{title}</label>
  
      <div className={styles.collapsibleContent}>
        <div className={styles.contentInner}>
          {children}
        </div>  
      </div>
      
    </div>
  )
}
