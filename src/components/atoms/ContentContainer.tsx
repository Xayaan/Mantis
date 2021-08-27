import React, { ReactElement, ReactNode } from 'react'
import styles from './ContentContainer.module.css'

export default function ContentContainer({children}: {children: ReactNode}): ReactElement {

    return (
        <div className={styles.Container}>
            {children}
        </div>
    )
}
