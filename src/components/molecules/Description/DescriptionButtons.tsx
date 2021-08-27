import React, { MouseEvent, ReactElement } from 'react'
import styles from './Description.module.css'

type DescriptionButtonAddProps = {
    onClick: (item: string) => void,
    icon: ReactElement,
    description: string
}

type DescriptionButtonProps = {
    onEvent: (changed_description: string) => void,
    type: 'verify' | 'flag'
    icon: ReactElement,
    description: string
    checked?: boolean
}

export const DescriptionButtonAdd = ({onClick, icon, description}: DescriptionButtonAddProps) => {

    const clickedXButton = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        onClick(description)
    }
  
    return (
        <button className={styles.descriptionButton} onClick={clickedXButton}>
            {icon}
        </button>
    )
}

export const DescriptionButton = ({
    onEvent, 
    type,
    icon, 
    description, 
    checked
}: DescriptionButtonProps) => {
    
    // console.log(`[DESCRIPTION BUTTON] CHECKED = ${checked}`)
    // console.log(`[DESCRIPTION BUTTON] description = ${description}`)

    return (
        <>
            {type === 'verify' && description && (
                <>
                    {/* {console.log(description)} */}
                    {checked === undefined && (
                        <button className={styles.descriptionButton} onClick={() => onEvent(description)}>
                            {icon}
                        </button>
                    )}

                    {checked === false && (
                        <button className={styles.descriptionButton} onClick={() => onEvent(description)}>
                            {icon}
                        </button>
                    )}
        
                    {checked === true && (
                        <button className={styles.descriptionButtonAccepted} onClick={() => onEvent(description)}>
                            {icon}
                        </button>
                    )}
                </>
            )}
            {type === 'flag' && (
                <>
                    {checked === undefined && (
                        <button className={styles.descriptionButton} onClick={() => onEvent(description)}>
                            {icon}
                        </button>
                    )}
                    {checked === true && (
                        <button className={styles.descriptionButton} onClick={() => onEvent(description)}>
                            {icon}
                        </button>
                    )}
                    {checked === false && (
                        <button className={styles.descriptionButtonDeclined} onClick={() => onEvent(description)}>
                            {icon}
                        </button>
                    )}  
                </>
            )}
        </>
    )
}
  