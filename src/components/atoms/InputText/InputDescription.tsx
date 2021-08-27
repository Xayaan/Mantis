import classNames from 'classnames/bind'
import React, { ReactElement } from 'react'

import styles from './InputTag.module.css'

export interface InputProps {
  addDescription?: (new_description: string) => void,
  editDescription?: (edit_description: string) => void,
  removeDescription?: (remove_description: string) => void,
  profanityFilter?: (filter_text: string) => boolean
  name: string
  inputRef?: React.RefObject<HTMLInputElement>
  placeholder?: string
  size?: 'mini' | 'small' | 'large' | 'default'
}

const cx = classNames.bind(styles)

const defaultInputProps = {
  size: 'default',
  placeholder: 'Enter a description for this image then press ENTER',
  name: 'description'
}

export default function InputDescription({
  addDescription, 
  editDescription, 
  removeDescription, 
  profanityFilter,
  ...props 
}: InputProps): ReactElement {

  const handleChange = (evt : React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key == 'Enter') {
      // send data to state with addDescription
      if (evt.target.value) {
        addDescription(evt.target.value)
      }
      
      // reset text field
      evt.target.value = ""
    }
  }

  return (
    <div className={styles.descriptionView}>
      <input
        autoComplete="off"
        className={cx({ input: true, [defaultInputProps.size]: defaultInputProps.size })}
        id={defaultInputProps.name}
        placeholder={defaultInputProps.placeholder}
        onKeyDown={(e) => handleChange(e)}
      />
    </div>
  )
}
