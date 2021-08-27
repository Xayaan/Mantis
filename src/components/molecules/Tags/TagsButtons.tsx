import React, { MouseEvent, ReactElement } from 'react'

import styles from './Tags.module.css'

type RemoveTagButtonProps = {
  onRemove: (removed_tag: string) => void,
  icon: ReactElement,
  tag: string
}

type RemoveTagForAllButtonProps = {
  onRemoveTagForAll: (removed_tag: string) => void,
  icon: ReactElement,
  tag: string
}

type EditTagButtonProps = {
  onProposeToEdit: (edited_tag: string) => void,
  icon: ReactElement
  tag: string
}


export const RemoveTagButton = ({onRemove, icon, tag}: RemoveTagButtonProps) => {
  return (
    <button className={styles.flexWrapButton} onClick={() => onRemove(tag)}>
      {icon}
    </button>
  )
}


export const RemoveTagForAllButton = ({onRemoveTagForAll, icon, tag}: RemoveTagForAllButtonProps) => {
  return (
    <button className={styles.flexWrapButton} onClick={() => onRemoveTagForAll(tag)}>
      {icon}
    </button>
  )
}



export const EditTagButton = ({onProposeToEdit, icon, tag}: EditTagButtonProps) => {  
  return (
    <button className={styles.multipleButtonsWrapButton} onClick={() => onProposeToEdit(tag)}>
      {icon}
    </button>
  )
}