import React from 'react'

import styles from './Dropdown.module.css'

type DropdownProps = {
    options: string[]
    addTagAndClear?: (e: any, new_tag: string, existing_tags?: string[]) => void 
    changeMode?: (new_mode: string) => void
    existingTags?: string[]
    location?: string
}

export function Dropdown({ 
    options, 
    addTagAndClear, 
    changeMode,
    existingTags=[],
    location
}: DropdownProps) {    
    return (
        <div className={styles.listGroup}>
            {options && options.map((option: string, i: number) => {
                return (
                    <div key={i}>
                    {location === 'annotation' ? (
                        <li onClick={(e) => changeMode(option)}>
                            {option}
                        </li>
                    ) : (
                        <li onClick={(e) => addTagAndClear(e, option, existingTags)} key={option}>
                            {option}
                        </li>
                    )}
                    </div>
                )
            })}
        </div>
    )
}