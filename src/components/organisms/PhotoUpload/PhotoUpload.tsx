import * as React from 'react'
import { MouseEvent } from 'react'
import { useState } from 'react'

import { PostFile, PostMetadata } from '../../../api/photo/post'
import { useAuthContext } from '../../../providers/AuthProvider'
import { useBatchUploadDataContext } from '../../../providers/PhotoUpload/BatchUpload/BatchUploadDataProvider'
import { useBatchUploadErrorContext } from '../../../providers/PhotoUpload/BatchUpload/BatchUploadErrorProvider'
import { usePhotoUploadErrorContext } from '../../../providers/PhotoUpload/SingleImageUpload/PhotoUploadErrorProvider'
import { usePhotoUploadContext } from '../../../providers/PhotoUpload/SingleImageUpload/PhotoUploadProvider'
import { useWeb3 } from '../../../providers/Web3'
import Alert from '../../atoms/Alert/Alert'
import styles from './PhotoUpload.module.css'
import { UploadTitle } from './shared/UploadTitle'
import { SingleImageUpload } from './SingleImageUpload/SingleImageUpload'

export default function PhotoUpload() {
  // TODO
  // Move Network ID to auth Error Provider
  const { accountId, networkId } = useWeb3()

  const [imagePreviewUrl, setPreview] = useState<string>('')
  const [photoId, setPhotoId] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [multipleImages, setMultipleImages] = useState<boolean>(false)
  const [options, setOptions] = useState<string[]>()
  const [failedToPost401, setFailedToPost401] = useState<boolean>()

  const [acceptedFiles, setAcceptedFiles] = useState<File[]>()
  const [resetFiles, setResetFiles] = useState<boolean>()

  const { 
    tags, 
    description,  
    checkList,
    badWords,
    resetTags,
    resetDescription 
  } = usePhotoUploadContext()

  /* ERROR SETTERS */
  const { 
    setErrors,
    setMetadataSuccess, 
    setDropzoneError,
    setUploadMetadataError,

    resetUploadImageSignals, 
    resetMetadataSignals,

    postSuccessSignalsActivated
  } = usePhotoUploadErrorContext()

  const {
    setTooManyImagesError,
    setRefreshDropZone,
    resetBatchUploadSignals,

    refreshDropZone
  } = useBatchUploadErrorContext()

  const {
    clearBatchUploadRenderPackage,
    clearBatchUploadIndex
  } = useBatchUploadDataContext()
  /* END ERROR SETTERS */

  const { accessToken, notLoggedInError, setNeedToRefreshTokenError } = useAuthContext()

  /**************************/
  /*** UI SIGNAL HANDLING ***/
  /**************************/
  const resetView = () => {
    setPreview('')
    resetTags()
    resetDescription()
    setResetFiles(true)
  }

  const SetResetFiles = (status: boolean) => {
    setResetFiles(status)
  }

  const SetFailedToPost401 = (status: boolean) => {
    setFailedToPost401(status)
  }
  
  /******************/
  /*** UI CHANGES ***/
  /******************/
  React.useEffect(() => {
    if (postSuccessSignalsActivated) { 
      SetResetFiles(true)
    }
  }, [postSuccessSignalsActivated])

  React.useEffect(() => {
    if (refreshDropZone) { 
      // console.log(`refreshDropZone === ${refreshDropZone}`)
      SetResetFiles(true)
      clearBatchUploadRenderPackage()
      clearBatchUploadIndex()
    }
  }, [refreshDropZone])

  // as soon as files are refreshed (resetFiles === true), set the variables back to false.
  React.useEffect(() => {
    if (resetFiles) { 
      SetResetFiles(false)
      setRefreshDropZone(false)
    }
  }, [resetFiles])


  // UPLOADING IMAGES WHEN THEY ARE DROPPED.
  // If multiple images are uploaded, a domino which extends to <BatchUpload /> is triggered
  // (photos are posted in <BatchUpload />)
  const uploadImageDropzone = async(acceptedFiles: File[]) => {
    SetFailedToPost401(false)
    setResetFiles(false)
    resetMetadataSignals()
    resetUploadImageSignals()
    resetBatchUploadSignals()
    setRefreshDropZone(false)
    
    if (acceptedFiles.length === 1) {
      setMultipleImages(false)
      setLoading(true)

      PostFile(acceptedFiles[0], accountId, accessToken).then(jsonResult => {
        console.log(jsonResult)
        if (jsonResult["messages"] && jsonResult["messages"] !== []) {
          setErrors(jsonResult["messages"])
          setLoading(false)
          resetView()
        } else if (jsonResult["message"] && jsonResult["message"] !== "" && jsonResult["message"] !== "File successfully uploaded") {
          if (jsonResult["message"] === "Token owner and `uploaded_by` does not match ") {
            setErrors(["FATAL ERROR: Authentication failed. The developers are working hard to fix this as soon as possible."])
          } else {
            setErrors([jsonResult["message"]])
          }
          setLoading(false)
          resetView()
        } else if (jsonResult["failed"] == 400) {
          setErrors(["FATAL ERROR: Authentication failed. The developers are working hard to fix this as soon as possible."])
        } else {
          resetUploadImageSignals()
          const fileurl = URL.createObjectURL(acceptedFiles[0])
          
          setPhotoId(jsonResult["id"])
          setPreview(fileurl)
          setLoading(false)

        }
      }).catch((err) => {
        console.log(err)
        if (err == "SyntaxError: Unexpected token < in JSON at position 0") {
          setNeedToRefreshTokenError(true)
          SetFailedToPost401(true)
        }
        setDropzoneError(true)
        resetView()
        setLoading(false)
      })

    } 
    // MULTIPLE IMAGES
    // else if (acceptedFiles.length <= 3) {
    //   console.log(`=== MULTIPLE IMAGES\nPosting in the next component... === `)
    //   setMultipleImages(true)
    //   setLoadingBatch(true)
    //   setAcceptedFiles(acceptedFiles)
    // }
      
    else {
      setTooManyImagesError(true)
      setTimeout(() => {
        setTooManyImagesError(false)
      }, 5000)
      setRefreshDropZone(true)
    }
  }


  /****************************/
  /*** SINGLE IMAGE SUBMITS ***/
  /****************************/
  const submitImageWithTags = async (e: MouseEvent<HTMLElement>) => {
    SetFailedToPost401(false)
    resetUploadImageSignals()
    const other = description

    // console.log(`PHOTOID =`, photoId)

    PostMetadata(accessToken, photoId, tags, other).then(jsonResult => {
      if (jsonResult["status"] == "failed" || jsonResult["status"] == 400) {
        setUploadMetadataError(true)
        resetView()
      } else if (jsonResult["msg"] === "Token has expired") {
        setNeedToRefreshTokenError(true)
        SetFailedToPost401(true)
      } else {
        setMetadataSuccess()
        resetView()
      }
    })
  }

  /**********************************/
  /*** PROFANITY & SEARCH FILTERS ***/
  /**********************************/
  const searchFilter = (filter_text: string) => {
    if (checkList) {
      const filteredItems = filter_text === '' ? checkList : checkList.filter(
        (item: string) =>
          item.slice(0, filter_text.length).toLocaleLowerCase().includes(filter_text)
        )
      const shuffled = filteredItems.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 10);
      
      setOptions(selected) // local
    }
  }

  const profanityFilter = (filter_text: string): boolean => {
    const filteredItems = badWords.filter(
      (item: string) =>
        item.toLocaleLowerCase() === filter_text
      )

    if (filteredItems.length === 0) {
      return true
    } else {
      return false
    }
  }

  return (
    <div className={styles.PhotoUpload}>
      <UploadTitle 
        error={notLoggedInError} 
        callback={uploadImageDropzone}
        resetAcceptedFiles={resetFiles}
      />

      {multipleImages && !notLoggedInError && acceptedFiles ? (
        <></>
        // <BatchUpload 
        //   acceptedFiles={acceptedFiles}
        //   searchFilter={searchFilter}
        //   profanityFilter={profanityFilter}
        // />
      ) : !multipleImages && !notLoggedInError && (
        <SingleImageUpload 
          loading={loading}
          imageurl={imagePreviewUrl}
          options={options}
          onSubmitPhoto={submitImageWithTags}
          searchFilter={searchFilter}
          profanityFilter={profanityFilter}
        />
      )}

      {failedToPost401 && (
        <Alert text={"There was a problem sending your data. We're sorry about this. Please try again in 10 seconds."} state="guidelinesWarning" />
      )}
      
    </div>
  )
}