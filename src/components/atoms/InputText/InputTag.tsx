import classNames from 'classnames/bind'
import React, { ReactElement, useState } from 'react'

// import { useVerificationDataContext } from '../../../providers/Verify/VerificationDataProvider'
import Alert from '../Alert/Alert'
import { Dropdown } from '../Dropdown'
import styles from './InputTag.module.css'

export interface InputProps {
  addTag?: (new_tag: string) => void,
  addAddedTag?: (new_tag: string, existing_tags: string[]) => void
  searchFilter?: (filter_text: string) => void
  profanityFilter?: (filter_text: string) => boolean
  location?: 'verification' | 'singleUpload' | 'batchUpload'
  options?: string[]
  existingTags?: string[]
  name: string
  inputRef?: React.RefObject<HTMLInputElement>
  placeholder?: string
  size?: 'mini' | 'small' | 'large' | 'default'
}

const cx = classNames.bind(styles)

const defaultInputProps = {
  size: 'default',
  placeholder: 'Enter tag then press ENTER',
  name: 'tag'
}

export default function InputTag({ 
  addTag, 
  addAddedTag, 
  searchFilter, 
  profanityFilter, 
  location,
  existingTags,
  placeholder, 
  options, 
  ...props 
}: InputProps): ReactElement {
  const [showingDropdown, setShowingDropdown] = useState<boolean>(false)
  const [isBadWord, setIsBadWord] = useState<boolean>(false)

  // const { currentVerificationIndex } = useVerificationDataContext()

  const handleChange = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      if (evt.target.value) {
        if (profanityFilter(evt.target.value)) {
          if (addTag !== undefined) {
            addTag(evt.target.value)
          } else if (addAddedTag !== undefined) {
            addAddedTag(evt.target.value, existingTags)
          }
        } else {
          // console.log(`profane word here.`)
          setIsBadWord(true)
          setInterval(function() { 
            setIsBadWord(false)
          }, 5000)
        }
      }

      // Stop showing dropdown
      if (showingDropdown) {
        setShowingDropdown(false)
      }
      
      // refresh input field
      evt.target.value = ""
    } 

    if (evt) {
      // console.log(`evt exists. passing searchFilter. search filter: `)
      searchFilter(evt.target.value)

      if (!showingDropdown && evt.target.value !== '') {
        setShowingDropdown(true)
      } else if (showingDropdown && evt.target.value === '') {
        setShowingDropdown(false)
      }
    }
  }

  const addTagAndClear = (e: any, new_tag: string, existing_tags?: string[]) => {
    if (new_tag !== '') {
      if (addTag !== undefined) {
        // e.current.value = ""
        addTag(new_tag)
        setShowingDropdown(false)
      } else if (addAddedTag !== undefined) {
        addAddedTag(new_tag, existing_tags)
      }
    }
  }

  return (
    <div className={styles.tagView}>
    
    {handleChange && (
      <input
        autoComplete="off"
        className={cx({ input: true, [defaultInputProps.size]: defaultInputProps.size })}
        id={defaultInputProps.name}
        placeholder={placeholder ? placeholder : defaultInputProps.placeholder}
        onKeyUp={(e) => { handleChange(e)} }
      /> 
    )}

    {showingDropdown && (
      <Dropdown 
        options={options}
        addTagAndClear={addTagAndClear}
        existingTags={existingTags}
      />
    )}
     {isBadWord && (
        <Alert text={"This tag is not allowed!"} state="guidelinesWarning" />
      )}
    </div>
  )
}
