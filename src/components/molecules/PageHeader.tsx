import React, { ReactElement } from 'react'
import classNames from 'classnames/bind'
import styles from './PageHeader.module.css'

const cx = classNames.bind(styles)

export type PageHeaderProps = {
  title: string
  description?: string
  center?: boolean
}

export default function PageHeader({title, description, center}: PageHeaderProps): ReactElement {
  const styleClasses = cx({
    header: true,
    center: center
  })

  return (
    <header className={styleClasses}>
      {/*<img width="80px" src={'/mantis.svg'} alt="MantisLogo"/>*/}
      <h1 className={styles.title}>{title}</h1>
      {<p className={styles.description}>{description}</p>}
    </header>
  )
}
