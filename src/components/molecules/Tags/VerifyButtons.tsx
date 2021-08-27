import React, {  MouseEvent, ReactElement } from 'react'
import { GoCheck, GoPencil } from 'react-icons/go';
import { IoMdClose } from 'react-icons/io'

import styles from './VerifyButtons.module.css'
import { EditTagButton } from './TagsButtons'


type FlagTagButtonProps = {
  onFlag: (flagged_tag: string) => void,
  icon: ReactElement,
  tag: string,
  checked: boolean
}

type VerifyTagButtonProps = {
  onVerify: (verified_tag: string) => void,
  icon: ReactElement,
  tag: string,
  checked: boolean
}

type VerifyButtonsProps = {
  tag: string,
  checked: boolean,
  onFlagTag?: (flagged_tag: string) => void,
  onVerifyTag?: (verified_tag: string) => void,
  onProposeToEditTag?: (edited_tag: string) => void
}


const FlagTagButton = ({
  onFlag, 
  icon, 
  tag, 
  checked
}: FlagTagButtonProps) => {
  
  const clickedFlagButton = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    onFlag(tag)
  }

  // console.log(`[RED BUTTON, ${tag}] CHECKED = ${checked}`)

  return (
    <>
      {checked == true &&
        <button className={styles.multipleButtonsWrapButton} onClick={clickedFlagButton}>
          <div className={styles.multipleButtonsWrapButtonSingular}>
            {icon}
          </div>
        </button>
      }

      {checked == undefined && 
        <button className={styles.multipleButtonsWrapButton} onClick={clickedFlagButton}>
          <div className={styles.multipleButtonsWrapButtonSingular}>
            {icon}
          </div>
        </button>
      }

      {checked == false &&
        <button className={styles.multipleButtonsWrapButton} onClick={clickedFlagButton}>
          <div className={styles.multipleButtonsWrapButtonDenied}>
            {icon}
          </div>
        </button>
      }
      
    </>
  )
}


const VerifyTagButton = ({
  onVerify, 
  icon, 
  tag, 
  checked
}: VerifyTagButtonProps) => {

  const clickedVerifyButton = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    onVerify(tag)
  }

  // console.log(`[GREEN BUTTON, ${tag}] CHECKED = ${checked}`)

  return (
    <>
    {checked == true &&
      <button className={styles.multipleButtonsWrapButton} onClick={clickedVerifyButton}>
        <div className={styles.multipleButtonsWrapButtonAccepted}>
          {icon}
        </div>
      </button>
    }

    {checked == undefined && 
      <button className={styles.multipleButtonsWrapButton} onClick={clickedVerifyButton}>
        <div className={styles.multipleButtonsWrapButtonSingular}>
          {icon}
        </div>
      </button>
    }

    {checked == false &&
      <button className={styles.multipleButtonsWrapButton} onClick={clickedVerifyButton}>
        <div className={styles.multipleButtonsWrapButtonSingular}>
          {icon}
        </div>
      </button>
    }
    </>
  )
}


export const VerifyButtons = ({
  tag,
  checked,
  onFlagTag,
  onVerifyTag,
  onProposeToEditTag}: VerifyButtonsProps) => {
      
  return (
    <>
      {onFlagTag && (
        <FlagTagButton
          onFlag={onFlagTag}
          icon={<IoMdClose className={styles.multipleButton} />}
          tag={tag}
          checked={checked}
        />
      )}

      {onVerifyTag && (
        <VerifyTagButton
          onVerify={onVerifyTag}
          icon={<GoCheck className={styles.multipleButton} />}
          tag={tag}
          checked={checked}
        />
      )}

      {onProposeToEditTag && (
        <EditTagButton
          onProposeToEdit={onProposeToEditTag}
          icon={<GoPencil className={styles.multipleButton} />}
          tag={tag}
        />
      )}
      </>
  )
}