import React from 'react'
import { IoMdCloseCircle } from 'react-icons/io'

import styles from './Tags.module.css'
import { RemoveTagButton, RemoveTagForAllButton } from './TagsButtons'

type BatchUploadButtonProps = {
  tag: string,
  onRemoveTag: (removed_tag: string) => void,
  onRemoveTagForAll?: (removed_tag: string) => void
}


export const BatchUploadButtons = ({
  tag,
  onRemoveTag,
  onRemoveTagForAll
}: BatchUploadButtonProps) => {
    return (
      <>
        {onRemoveTagForAll && (
          <RemoveTagForAllButton
            onRemoveTagForAll={onRemoveTagForAll}
            icon={<IoMdCloseCircle className={styles.removeTag} />}
            tag={tag}
          />
        )}
  
        {onRemoveTag && (
          <RemoveTagButton
            onRemove={onRemoveTag}
            icon={<IoMdCloseCircle className={styles.removeTag} />}
            tag={tag}
          />
        )}
      </>
    )
  }