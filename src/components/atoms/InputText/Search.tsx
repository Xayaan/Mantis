import React, { ReactElement, useEffect, useRef } from 'react'

import styles from './Search.module.css'

export interface InputProps {
  searchFilter?: (current_input: string) => void,
  name: string
  inputRef?: React.RefObject<HTMLInputElement>
  placeholder?: string
  size?: 'mini' | 'small' | 'large' | 'default'
}

const defaultInputProps = {
  size: 'default',
  placeholder: 'Enter tag then press ENTER',
  name: 'tag'
}

export default function Search({ searchFilter }: InputProps): ReactElement {
  const handleChange = (event_text: string) => {
    searchFilter(event_text.toLocaleLowerCase())
  }

  return (
    <div className={styles.tagView}>

    <div className={styles.searchTag}>
      <input
        autoFocus
        autoComplete="off"
        id={defaultInputProps.name}
        placeholder={defaultInputProps.placeholder}
        onKeyUp={(e) => { handleChange(e.target.value) }}
      />
    </div>

    </div>
  )
}
