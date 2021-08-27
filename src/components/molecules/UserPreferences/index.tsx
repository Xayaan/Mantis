import React, { ReactElement } from 'react'
import Cog from '../../../images/cog.svg'
import styles from './index.module.css'
// import Currency from './Currency'
import Caret from '../../../images/caret.svg'
import useDarkMode from 'use-dark-mode'
import { darkModeConfig } from '../../../../app.config'
import Tooltip from '../../atoms/Tooltip/Tooltip'
import Appearance from './Appearance'

export function UserPreferences(): ReactElement {
  // // Calling this here because <Theme /> is not mounted on first load
  const darkMode = useDarkMode(false, darkModeConfig)

  return (
    <Tooltip
      content={
        <ul className={styles.preferencesDetails}>
          <Appearance darkMode={darkMode} />
        </ul>
      }
      trigger="click focus"
      className={styles.preferences}
    >
      <div className={styles.icon}>
        <Cog aria-label="Preferences" />
      </div>
      <Caret aria-hidden="true" />
    </Tooltip>
  )
}