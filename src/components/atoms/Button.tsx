import classNames from 'classnames/bind'
import { Link } from 'gatsby'
import React, { FormEvent, ReactElement, ReactNode } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

import { useWeb3 } from '../../providers/Web3'
import styles from './Button.module.css'

const cx = classNames.bind(styles)

interface ButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: (e: FormEvent) => void
  disabled?: boolean
  to?: string
  name?: string
  size?: 'small'
  style?: 'primary' | 'ghost' | 'text'
  type?: 'submit'
  download?: boolean
  target?: string
  rel?: string
  title?: string
}

export function Button({
  href,
  children,
  className,
  to,
  size,
  style,
  ...props
}: ButtonProps): ReactElement {
  
  const styleClasses = cx({
    button: true,
    primary: style === 'primary',
    ghost: style === 'ghost',
    text: style === 'text',
    small: size === 'small',
    [className]: className
  })

  return to ? (
    <Link to={to} className={styleClasses} {...props}>
      {children}
    </Link>
  ) : href ? (
    <a href={href} className={styleClasses} {...props}>
      {children}
    </a>
  ) : (
    <button className={styleClasses} {...props}>
      {children}
    </button>
  )
}

interface NoMetamaskConnectedButtons {
  text: string
  type: 'download' | 'connect'
}

export function DownloadMetamaskButton({text, type}: NoMetamaskConnectedButtons): ReactElement {
  const { connect } = useWeb3()
  
  async function handleActivation(e: FormEvent<HTMLButtonElement>) {
    // prevent accidentially submitting a form the button might be in
    e.preventDefault()
    await connect()
  }

  return (
    <>
    {type === 'download' ? (
      <a
        className={`${styles.metamaskButton} ${styles.metamaskInitial}`}
        href={`https://metamask.io/download`}
        target="_blank"
      >
      {text}
      </a>
    ) : type === 'connect' && (
      <button
        className={`${styles.metamaskButton} ${styles.metamaskInitial}`}
        onClick={(e) => handleActivation(e)}
      >
      {text}
      </button>
    )}
    </>
  )
}

export function BackToHomeLink(): ReactElement {
  return (
    <Link className={styles.backToHomeLink} to={`/`}>
      ←
    </Link>
  )
}


// TODO
// Simplify
export function SimpleButton({
  onClick, 
  text,
  disabled=false
}: {onClick: any, text: string, disabled?: boolean}) : ReactElement {

  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  )
}


export function PaginationNumberButton({
  onClick, 
  text,
  current
}: {onClick: any, text: string, current?: boolean}) : ReactElement {

  return (
    <>
    {current ? (
      <button className={styles.paginationNumberButtonCurrent} onClick={onClick}>
        {text}
      </button>
    ) : (
      <button className={styles.paginationNumberButton} onClick={onClick}>
        {text}
      </button>
    )}
    </>
  )
}


export function TimeStateButton({
  text,
  onClick,
  current
}: {text: string, onClick?: any, current?: boolean}) : ReactElement {

  return (
    <>
    {current ? (
      <button className={styles.timeStateButtonCurrent} onClick={onClick}>
        {text}
      </button>
    ) : (
      <button className={styles.timeStateButton} onClick={onClick}>
        {text}
      </button>
    )}
    </>
  )
}



export function LeftArrowButton({
  onClick
}: {onClick: () => void}): ReactElement {
  return (
    <button className={styles.paginationArrowButton} onClick={onClick}>
      <AiOutlineArrowLeft />
    </button>
  )
}

export function RightArrowButton({
  onClick
}: {onClick: () => void}): ReactElement {
  return (
    <button className={styles.paginationArrowButton} onClick={onClick}>
      <AiOutlineArrowRight />
    </button>
  )
}


export function AnnotateRandomImages({ onClick }: { onClick: () => void }) : ReactElement {
  return (
    <button className={styles.button}>
      Random Images
    </button>
  )
}

export function AnnotateMyOwnImages({ onClick }: { onClick: () => void }) : ReactElement {
  return (
    <button className={styles.button}>
      My Own Images
    </button>
  )
}

