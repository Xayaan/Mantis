import * as React from 'react'
import { MouseEvent, ReactElement } from 'react'

import { useAuthContext } from '../../../../providers/AuthProvider'
import { useBatchUploadErrorContext } from '../../../../providers/PhotoUpload/BatchUpload/BatchUploadErrorProvider'
import { usePhotoUploadErrorContext } from '../../../../providers/PhotoUpload/SingleImageUpload/PhotoUploadErrorProvider'
import { usePhotoUploadContext } from '../../../../providers/PhotoUpload/SingleImageUpload/PhotoUploadProvider'
import Alert from '../../../atoms/Alert/Alert'
import { SimpleButton } from '../../../atoms/Button'
import Loader from '../../../atoms/Loader'
import DescriptionView from '../../DescriptionView'
import InputTagView from '../../InputTagView'
import styles from './SingleImageUpload.module.css'

interface SingleImageUploadProps {
  loading: boolean
  imageurl: string
  options: string[]
  onSubmitPhoto: (e: MouseEvent<HTMLElement>) => Promise<void>
  searchFilter: (filter_text: string) => void
  profanityFilter: (filter_text: string) => boolean
}

export function SingleImageUpload({ 
  loading,
  imageurl, 
  options, 
  onSubmitPhoto, 
  searchFilter, 
  profanityFilter 
}: SingleImageUploadProps): ReactElement {

  const { 
    tags, 
    description, 
    addTag, 
    removeTag, 
    resetTags, 
    addDescription,
    removeDescription, 
    resetDescription 
  } = usePhotoUploadContext()

  const { 
    errors,
    metadataSuccess,
    dropzoneError
  } = usePhotoUploadErrorContext()

  const {
    tooManyImagesError
  } = useBatchUploadErrorContext()

  const { 
    notLoggedInError 
  } = useAuthContext()

  const resetView = () => {
    resetDescription()
    resetTags()
  }

  // TS
  // useEffect(() => {
  //   console.log(`Loading changed to ${loading}`)
  //   console.log(`imageurl = ${imageurl}`)
  // }, [imageurl])

  return (
    <div className={styles.PhotoUpload}>

      {loading && !imageurl && !notLoggedInError ? (
        <Loader message="Loading image..."/>
      ) : (
        <>
        <div className={styles.ImageView}>
          {imageurl ? (
            <div>
              <div className={styles.backgroundColor}>
                <img className={styles.imageResize} src={imageurl} />
              </div>
              
              <DescriptionView
                multipleImages={false} 
                description={description}
                onEnterDescription={addDescription}
                onRemoveDescription={removeDescription}
              />

              <InputTagView 
                options={options}
                multipleImages={false} 
                searchFilter={searchFilter}
                profanityFilter={profanityFilter}
                onEnterTag={addTag} 
                onRemoveTag={removeTag} 
                tagList={tags} 
              />

              <SimpleButton onClick={onSubmitPhoto} text={"Submit Description & Tags"}/>
            </div>
          ) : (
            <></>
          )}

          </div>
        </>
      )}

      {errors && (
        errors.map((error, i) => {
          return (
            <div key={i} className={styles.Padding}>
              <Alert text={error} state="error" />
            </div>
          )
        })
      )}

      {metadataSuccess && (
        <div className={styles.Padding}>
          <Alert text={"Successfully uploaded tags and descriptions!"} state="success" />
        </div>
      )}

      {dropzoneError && (
        <div className={styles.Padding}>
          <Alert text={"Error dropping images. Please try again."} state="error" />
        </div>
      )}

      {tooManyImagesError && (
        <div className={styles.Padding}>
          <Alert text={"You uploaded too many images. Please only upload one image."} state="error" />
        </div>
      )}
      
    </div>
  )
}