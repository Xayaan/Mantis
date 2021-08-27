import React from 'react'
import { IoMdCloseCircle } from 'react-icons/io'

import styles from './Tags.module.css'
import { RemoveTagButton } from './TagsButtons'

type SinglePhotoUploadButtonsProps = {
    tag: string,
    onRemoveTag: (removed_tag: string) => void
}

export const SinglePhotoUploadButtons = ({tag, onRemoveTag}: SinglePhotoUploadButtonsProps) => {

    return (
      <>
        <RemoveTagButton
          onRemove={onRemoveTag}
          icon={<IoMdCloseCircle className={styles.singleButton} />}
          tag={tag}
        />
      </>
    )
  }