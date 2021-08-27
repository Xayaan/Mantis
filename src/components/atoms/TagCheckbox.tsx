import React, { ReactElement, useEffect, useRef, useState } from 'react'

type TagCheckboxProps = {
    location: 'verification' | 'singlePhotoUpload'
    existing_tags?: string[]
    added_tags?: string[]
    label: string
    addTag: (special_tag: string, existing_tags?: string[]) => void
    removeTag: (special_tag: string, existing_tags?: string[]) => void 
    special_tag: string
}

export function TagCheckbox({ 
    location,
    existing_tags,
    added_tags,
    label, 
    addTag, 
    removeTag, 
    special_tag 
  }: TagCheckboxProps): ReactElement {
    const [checked, setChecked] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(false)

    const changeChecked = () => {
      if (checked) {
        setChecked(false)
      } else {
        setChecked(true)
      }
    }
  
    useEffect(() => {
        if (componentIsMounted) {
            if (location === 'singlePhotoUpload') {
                if (checked) {
                    addTag(special_tag)
                } else {
                    removeTag(special_tag)
                }
            } else if (location === 'verification') {
                if (checked) {
                    addTag(special_tag, existing_tags)
                } else {
                    removeTag(special_tag, existing_tags)
                }
            }
        }
    }, [checked])

    useEffect(() => {
        if (existing_tags) {
            if (existing_tags.includes(special_tag)) {
                setChecked(true)
                setDisabled(true)
            } else {
                setChecked(false)
                setDisabled(false)
            }
        }
    }, [existing_tags])

    useEffect(() => {
        if (added_tags) {
            if (added_tags.includes(special_tag)) {
                setChecked(true)
            } else {
                setChecked(false)
            }
        }
    }, [added_tags])

    const componentIsMounted = useRef(true)
    useEffect(() => {
        return () => {
            componentIsMounted.current = false
        }
    }, [])
  
    return (
      <div>
        <label>
          <input
            disabled={disabled}
            type="checkbox"
            value={label}
            checked={checked}
            onChange={() => changeChecked()}
          />
          {label}
        </label>
      </div>
    )
  }