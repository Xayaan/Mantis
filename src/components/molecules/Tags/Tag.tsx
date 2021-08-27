import React from 'react'
import { SinglePhotoUploadButtons } from './SinglePhotoUploadButtons'
import styles from './Tags.module.css'
import { VerifyButtons } from './VerifyButtons'

type TagProps = {
  tag?: string
  addedTag?: string
  location: 'verification' | 'singlePhotoUpload' | 'batchUpload',
  checked?: boolean,
  onRemoveTag?: (removed_tag: string) => void,
  onFlagTag?: (flagged_tag: string) => void
  onVerifyTag?: (verified_tag: string) => void,
  onProposeToEditTag?: (edited_tag: string) => void
}


export const Tag = ({
  tag,
  addedTag,
  location,
  checked,
  onRemoveTag,
  onFlagTag,
  onVerifyTag,
  onProposeToEditTag,
}: TagProps) => {

  // console.log(`RENDERING INDIVIDUAL TAG.`)

    return (
      <>
      {/****************/}
      {/* VERIFICATION */}
      {/****************/}
      {location === 'verification' && (
        <>
          {tag !== undefined && tag !== '' && (
            <div className={styles.wrapper}>
              <span className={styles.singleImageTag}>{tag}</span>

              <VerifyButtons
                tag={tag}
                checked={checked}
                onFlagTag={(e) => onFlagTag(tag)}
                onVerifyTag={(e) => onVerifyTag(tag)}
                onProposeToEditTag={onProposeToEditTag}
              />
            </div>
          )}

          {addedTag !== undefined && addedTag !== '' && (
            <div className={styles.verificationTagWrapper}>
              <span className={styles.singleImageTag}>{addedTag}</span>

              <SinglePhotoUploadButtons
                tag={addedTag}
                onRemoveTag={onRemoveTag}
              />
            </div>
          )}
        </>
      )}

      {/****************/}
      {/**** UPLOAD ****/}
      {/****************/}
      {location === 'singlePhotoUpload' && (
        <div className={styles.wrapper}>
          {/* {console.log(`showing tag. tag = ${tag}`)} */}
          <span className={styles.singleImageTag}>{tag}</span>

          <SinglePhotoUploadButtons
            tag={tag}
            onRemoveTag={onRemoveTag}
          />
        </div>
      )}
      </>
    )
  }
