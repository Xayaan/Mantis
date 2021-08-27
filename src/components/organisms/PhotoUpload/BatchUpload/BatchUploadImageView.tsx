import { ImageRenderPackage } from '../../../../@types/Providers'
import * as React from 'react'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { ReactElement } from 'react'

import { useBatchUploadDataContext } from '../../../../providers/PhotoUpload/BatchUpload/BatchUploadDataProvider'
import { useBatchUploadErrorContext } from '../../../../providers/PhotoUpload/BatchUpload/BatchUploadErrorProvider'
import { unpackImageRenderPackage } from '../../../../utils/imageRenderPackage'
import Alert from '../../../atoms/Alert/Alert'
import { SimpleButton } from '../../../atoms/Button'
import Loader from '../../../atoms/Loader'
import { ImageDrawer } from '../../../molecules/ImageDrawer/ImageDrawer'
import BatchFileInfo from './BatchFileInfo'
import { BatchUploadInputDescriptionView } from './BatchUploadDescriptionView'
import styles from './BatchUploadImageView.module.css'
import { BatchUploadInputTagsView } from './BatchUploadInputTagsView'

// TODO
// Refactor this file to accept ImageRenderPackage
type BatchUploadImageViewProps = {
  // batchUploadImageRenderPackage: ImageRenderPackage[]
  acceptedFiles: File[]

  searchFilter?: (filter_text: string) => void
  profanityFilter: (filter_text: string) => boolean
  
  onSubmitThisPhoto?: (e: MouseEvent<HTMLButtonElement>, currentIndex: number) => Promise<void>,
  onSubmitAllPhotos?: (e: MouseEvent<HTMLButtonElement>) => Promise<void>,
  onSaveProgress?: (e: MouseEvent<HTMLButtonElement>, data: ImageRenderPackage[]) => Promise<void>,
  
  onEnterTag?: (entered_tag: string) => void,
  onEnterTagWholeSet?: (entered_tag: string) => void
  onRemoveTag?: (removed_tag: string) => void,
  onRemoveTagForAll?: (removed_tag: string) => void,

  onEnterDescription?: (new_description: string) => void,
  // onEnterDescriptionForAll?: (new_description: string) => void,
  onRemoveDescription?: (removed_description: string) => void,
  onRemoveDescriptionForAll?: (removed_description: string) => void
}

export function BatchUploadImageUploadView({
  // batchUploadImageRenderPackage,
  acceptedFiles,

  onSubmitThisPhoto,
  onSubmitAllPhotos,

  searchFilter,
  profanityFilter,
  
  onEnterTag, 
  onEnterTagWholeSet,
  onRemoveTag,
  onRemoveTagForAll,

  onEnterDescription,
  // onEnterDescriptionForAll,
  onRemoveDescription,
  onRemoveDescriptionForAll
}: BatchUploadImageViewProps): ReactElement {
  const [renderCurrentIndex, setRenderCurrentIndex] = useState<boolean>(false)

  const [localPhotoIds, setLocalPhotoIds] = useState<string[]>([])              // passed as component parameter
  const [localImageUrls, setImageUrls] = useState<string[]>([])                 // passed as component parameter
  const [localErrors, setLocalErrors] = useState<string[][]>([])                // passed as component parameter
  
  const {
    batchUploadImageRenderPackage,
    currentBatchUploadIndex,
    setCurrentBatchUploadIndex,
  } = useBatchUploadDataContext()

  const {
    loadingBatch,
  } = useBatchUploadErrorContext()

  const componentIsMounted = useRef(true)
    useEffect(() => {
      return () => {
        componentIsMounted.current = false
      }
  }, [])

  /************************************************/
  /* DETERMINE IF WE RENDER THE CURRENT COMPONENT */
  /************************************************/
  useEffect(() => {
    if (batchUploadImageRenderPackage) {
      if (batchUploadImageRenderPackage[currentBatchUploadIndex] !== undefined) {
        if (batchUploadImageRenderPackage[currentBatchUploadIndex].imageUrl === "") {
          setRenderCurrentIndex(false)    
        } else {
          setRenderCurrentIndex(true)
        }
      }
    }
  }, [batchUploadImageRenderPackage, currentBatchUploadIndex])

  // TS
  useEffect(() => {
    console.log(`=== PHOTO IDS ===`)
    console.log(localPhotoIds)
  }, [localPhotoIds])

    useEffect(() => {
    console.log(`=== IMAGE URLS ===`)
    console.log(localImageUrls)
  }, [localImageUrls])

  useEffect(() => {
    console.log(`=== ERRORS ===`)
    console.log(localErrors)
  }, [localErrors])

  // useEffect(() => {
  //   console.log(`currentBatchUploadIndex changed`)
  //   console.log(currentBatchUploadIndex)
  // }, [currentBatchUploadIndex])

  useEffect(() => {
    console.log(`renderCurrentIndex changed to ${renderCurrentIndex}`)
  }, [renderCurrentIndex])

  
  // UPDATE IMAGEURLS, TAGLIST, DESCRIPTIONS, PHOTOIDS ASYNCHRONOUSLY
  useEffect(() => {
    // console.log(`[IMAGE VIEW] Pkg changed`)
    if (batchUploadImageRenderPackage) {
      if (batchUploadImageRenderPackage.length !== 0) {
        console.log(batchUploadImageRenderPackage)
        const { photoIds, imageUrls, tagList, descriptions, errors } = unpackImageRenderPackage(batchUploadImageRenderPackage)

        setImageUrls(imageUrls)
        setLocalPhotoIds(photoIds)
        setLocalErrors(errors)
      }
    }
  }, [batchUploadImageRenderPackage])

  /********************/
  /* SLIDE NAVIGATORS */
  /********************/
  const prevSlide = () => {
    if (componentIsMounted && length) {
      setCurrentBatchUploadIndex(currentBatchUploadIndex === length - 1 ? 0 : currentBatchUploadIndex + 1)
    }
  }

  const nextSlide = () => {
    if (componentIsMounted && length) {
      setCurrentBatchUploadIndex(currentBatchUploadIndex === 0 ? length - 1 : currentBatchUploadIndex - 1)
    }
  }

  const onClickBox = (fileNumber: number) => {
    setCurrentBatchUploadIndex(fileNumber)
  }
    
  return (
    <div className={styles.ImageView}>
      {!loadingBatch ? (
        <div>
        {/***********************/}
        {/* SHOWS IMAGE BROWSER */}
        {/***********************/}
        {batchUploadImageRenderPackage.length !== 0 && (
          <BatchFileInfo
            images={batchUploadImageRenderPackage}
            onClickBox={onClickBox}
          />
        )}

        {renderCurrentIndex ? (
          <>
          {localImageUrls.length !== 0 && (
            <>
            {/*******************************************/}
            {/* SHOWS IMAGES & CHANGES BATCHUPLOADINDEX */}
            {/*******************************************/}
            <ImageDrawer
              imageurls={localImageUrls}
              location={'batchUpload'}
              prevSlide={prevSlide}
              nextSlide={nextSlide}
            />
            </> 
          )}
          
            {/************************************************/}
            {/* SHOWS DESCRIPTION INPUT BOXES & DESCRIPTIONS */}
            {/************************************************/}
            <BatchUploadInputDescriptionView
              onEnterDescription={onEnterDescription}
              // onEnterDescriptionForAll={onEnterDescriptionForAll}
              onRemoveDescription={onRemoveDescription}
              onRemoveDescriptionForAll={onRemoveDescriptionForAll}
            />
  
            {/*********************************/}
            {/* SHOWS TAGS INPUT BOXES & TAGS */}
            {/*********************************/}
            <BatchUploadInputTagsView
              searchFilter={searchFilter}
              profanityFilter={profanityFilter}
              onEnterTag={onEnterTag}
              onEnterTagForAll={onEnterTagWholeSet}
              onRemoveTag={onRemoveTag}
              onRemoveTagForAll={onRemoveTagForAll}
            />
  
            <SimpleButton onClick={(e: MouseEvent<HTMLButtonElement>) => onSubmitThisPhoto(e, currentBatchUploadIndex)} text={"Submit This Photo & Tags"}/>
            <SimpleButton onClick={onSubmitAllPhotos} text="Submit ALL Photos & Tags" />
            </>
        ) : batchUploadImageRenderPackage !== undefined && (
          <>    
          {batchUploadImageRenderPackage[currentBatchUploadIndex] !== undefined && (
            batchUploadImageRenderPackage[currentBatchUploadIndex].errors.map((err, i) => {
              return (
                <div key={i}>
                  <Alert text={`Image ${currentBatchUploadIndex} ERROR: ${err}`} state="error" />
                </div>
              )
            })
          )}
          </>
        )}
      </div>

      ) : (
        <Loader message={`Loading batch of ${acceptedFiles.length}...`} />
      )}
    </div>
  )
}