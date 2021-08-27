import classNames from 'classnames/bind'
import React, { FormEvent, ReactElement } from 'react'

import Badge from '../Badge/Badge'
import { Button } from '../Button'
import styles from './Alert.module.css'

type AlertProps = {
  title?: string
  badge?: string
  text: string
  state: 'error' | 'warning' | 'info' | 'success' | 'guidelinesWarning'
  action?: {
    name: string
    style?: 'text' | 'primary' | 'ghost'
    handleAction: (e: FormEvent<HTMLButtonElement>) => void
  }
  onDismiss?: () => void
  className?: string
}

const cx = classNames.bind(styles)

export default function Alert({
  title,
  badge,
  text,
  state,
  action,
  onDismiss,
  className
}: AlertProps): ReactElement {
  
  const styleClasses = cx({
    alert: true,
    [state]: state,
    [className]: className
  })

  return (
    <div className={styleClasses}>
      {title && (
        <h3 className={styles.title}>
          {title} {badge && <Badge className={styles.badge} label={badge} />}
        </h3>
      )}
      {text}
      {action && (
        <Button
          className={styles.action}
          size="small"
          style={action.style || 'primary'}
          onClick={action.handleAction}
        >
          {action.name}
        </Button>
      )}
      {onDismiss && (
        <button className={styles.close} onClick={onDismiss}>
          &times;
        </button>
      )}
    </div>
  )
}
