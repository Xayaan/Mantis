import * as React from 'react'
import { MouseEvent, ReactElement } from 'react'
import { useEffect } from 'react'

import { PostFiles } from '../../../../api/photo/batch'
import { PostMetadata } from '../../../../api/photo/post'
import { useAuthContext } from '../../../../providers/AuthProvider'
import { useBatchUploadDataContext } from '../../../../providers/PhotoUpload/BatchUpload/BatchUploadDataProvider'
import { useBatchUploadErrorContext } from '../../../../providers/PhotoUpload/BatchUpload/BatchUploadErrorProvider'
import { useBatchUploadContext } from '../../../../providers/PhotoUpload/BatchUpload/BatchUploadProvider'
import { useWeb3 } from '../../../../providers/Web3'
import Alert from '../../../atoms/Alert/Alert'
import styles from './BatchUpload.module.css'
import { BatchUploadImageUploadView } from './BatchUploadImageView'

interface BatchUploadProps {
  acceptedFiles: File[]
  searchFilter: (filter_text: string) => void
  profanityFilter: (filter_text: string) => boolean
}
interface BatchErrorSectionProps {
  message: string
  resetBatchUploadSignals: () => void
  setRefreshDropZone: (status: boolean) => void
}

const BatchErrorSection = ({
  message,
  resetBatchUploadSignals,
  setRefreshDropZone
}: BatchErrorSectionProps) => {
  return (
    <>
      <div className={styles.Padding}>
        <Alert text={message} state="error" />
      </div>
      <button onClick={() => {
        resetBatchUploadSignals() 
        setRefreshDropZone(true)
      }}>
        Click here to upload more
      </button>
    </>
  )
}

export function BatchUpload({
  acceptedFiles,
  searchFilter,
  profanityFilter
}: BatchUploadProps): ReactElement {

  const {
    addTagOnCurrent,
    removeTagOnCurrent,
    addDescriptionOnCurrent,
    removeDescriptionOnCurrent,
    
    addTagForAll,
    removeTagForAll,
  } = useBatchUploadContext()

  const {
    tooManyImagesError,
    allImagesInvalidError,
    allFilesUploadedSuccess,
    setLoadingBatch,
    resetBatchUploadSignals,
    setAllImagesInvalidError,
    setRefreshDropZone,
    setAllFilesUploadedSuccess
  } = useBatchUploadErrorContext()

  const {
    setBatchUploadRenderPackage,
    setCurrentBatchUploadIndex,
    batchUploadImageRenderPackage,
    currentBatchUploadIndex
  } = useBatchUploadDataContext()

  const { accessToken, notLoggedInError } = useAuthContext()
  const { accountId } = useWeb3()

  /*************************/
  /*** MULTI IMAGE LOADS ***/
  /*************************/
  const postBatch = () => {
    Array.from({ length: acceptedFiles.length } , () => ({
      photoId: '',
      imageUrl: '',
      tags: [],
      description: '',
      errors: []
    }))

    PostFiles(acceptedFiles, accountId, accessToken).then(({pkg, allInvalid}) => {
      // ts
      console.log(`=== POSTFILES RESOLVED ===\n PKG = `)
      console.log(pkg)

      setBatchUploadRenderPackage(pkg)
      setLoadingBatch(false)
      setAllImagesInvalidError(allInvalid)

      // SHOW SIGNAL THAT ALL IMAGES WERE UPLOADED
      // setAllFilesUploadedSuccess(true)
      // setTimeout(() => {
      //   setAllFilesUploadedSuccess(false)
      // }, 5000)
    })
  }

  useEffect(() => {
    postBatch()
  }, [acceptedFiles])

  // ts
  useEffect(() => {
    console.log(`BATCH UPLOAD IMAGE RENDER PACKAGE CHANGED`)
    console.log(batchUploadImageRenderPackage)

    // change to "all images are errors" if only errors are left.
    var count = 0
    batchUploadImageRenderPackage.forEach(pkg => {
      if (pkg.errors !== []) {
        count++
      }
      if (count === batchUploadImageRenderPackage.length) {
        setAllImagesInvalidError(true)
      }
    })     
  }, [batchUploadImageRenderPackage])


  /***************************/
  /*** MULTI IMAGE SUBMITS ***/
  /***************************/
  const submitBatchMetadata = async (e: MouseEvent<HTMLElement>) => {  
    var count = 0
    batchUploadImageRenderPackage.forEach((item, i) => {
      // set loading
      // setPostingBatchMetadata(true)

      PostMetadata(accessToken, item.photoId, item.tags, item.description).then(jsonResult => {
        count++
        console.log(`=== METADATA POSTED FOR IMAGE ${i}===`)
        console.log(jsonResult)

        // set signals
        // setBatchPostSuccess(true)
        // setTimeout(() => {
        //    setBatchPostSuccess(false)
        // }, 5000)

        // reset view
        if (count == batchUploadImageRenderPackage.length) {
          setRefreshDropZone(true)
          setBatchUploadRenderPackage([])
        }
      
      }).catch(err => {
        count++
        console.log(err)
        // setBatchPostError(true)

        // reset view
        if (count == batchUploadImageRenderPackage.length) {
          setRefreshDropZone(true)
          setBatchUploadRenderPackage([])
        }
      })
    })
  }

  const submitThisImageMetadata = async (e: MouseEvent<HTMLElement>) => {
    const item = batchUploadImageRenderPackage[currentBatchUploadIndex]
    PostMetadata(accessToken, item.photoId, item.tags, item.description).then(jsonResult => {
      console.log(`=== METADATA POSTED FOR IMAGE ${currentBatchUploadIndex}===`)
      console.log(jsonResult)

      // set signals
      // setSuccessfullyUploadedBatchImage(true)
      // setTimeout(() => {
      //    setSuccessfulyUploadedBatchImage(false)
      // }, 5000)

      // reset view if it's the last image
      if (batchUploadImageRenderPackage.length === 1) {
        setRefreshDropZone(true)
        setBatchUploadRenderPackage([])
        setCurrentBatchUploadIndex(0)
      }

      // Handle batch upload index
      if (batchUploadImageRenderPackage.length > 1 && currentBatchUploadIndex !== 0) {
        setCurrentBatchUploadIndex(currentBatchUploadIndex - 1)
      }

      const originalLength = batchUploadImageRenderPackage.length

      // pop updated image from batchUploadImageRenderPackage
      const updatedPkg = batchUploadImageRenderPackage
      updatedPkg.splice(currentBatchUploadIndex, 1)
      console.log(`=== UPDATED PKG ===`)
      console.log(updatedPkg)
      setBatchUploadRenderPackage(updatedPkg)
      
      // change to "all images are errors" if only errors are left.
      if (batchUploadImageRenderPackage.length < originalLength)
      var count = 0
      batchUploadImageRenderPackage.forEach((pkg, i) => {
        // console.log(`pkg ${i}`)
        if (pkg.errors !== []) {
          count++
        }
        if (count === batchUploadImageRenderPackage.length) {
          setAllImagesInvalidError(true)
        }
      })     
    }).catch(err => {
      console.log(err)
    })
  } 

  return (
    <div className={styles.PhotoUpload}>

      {!notLoggedInError && (
        <>
          <BatchUploadImageUploadView
            // batchUploadImageRenderPackage={batchUploadImageRenderPackage}
            acceptedFiles={acceptedFiles}

            onSubmitThisPhoto={submitThisImageMetadata}
            onSubmitAllPhotos={submitBatchMetadata}

            searchFilter={searchFilter}
            profanityFilter={profanityFilter}

            onEnterTag={addTagOnCurrent}
            onEnterTagWholeSet={addTagForAll}
            onRemoveTag={removeTagOnCurrent}
            onRemoveTagForAll={removeTagForAll}
            onEnterDescription={addDescriptionOnCurrent}  
            onRemoveDescription={removeDescriptionOnCurrent} 
          />
        </>
      )}

      {tooManyImagesError && (
        <BatchErrorSection 
          message={"Too many images uploaded. You can upload a maximum of 24 images at a time."}
          resetBatchUploadSignals={resetBatchUploadSignals}
          setRefreshDropZone={setRefreshDropZone}
        />
      )}

      {allImagesInvalidError && (
        <BatchErrorSection 
          message={"All the images you've uploaded are invalid. Browse through them to see the errors, or upload more images."}
          resetBatchUploadSignals={resetBatchUploadSignals}
          setRefreshDropZone={setRefreshDropZone}
        />
      )}

      {allFilesUploadedSuccess && (
        <div className={styles.Padding}>
          <Alert text={"Successfully uploaded all images."} state="success" />
        </div>
      )}
      
    </div>
  )
}