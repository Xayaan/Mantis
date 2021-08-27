import { Link } from "gatsby"
import * as React from 'react'
import { ReactElement, useEffect } from 'react'
import { DropzoneOptions, useDropzone } from "react-dropzone"

import { useAuthContext } from "../../../../providers/AuthProvider"
import Alert from '../../../atoms/Alert/Alert'
import styles from './UploadTitle.module.css'

export enum AcceptedFileType {
  IMAGE = 'image/jpeg, image/png',
  TEXT = 'text/plain',
  JSON = 'application/json'
}

type UploadTitleProps = { 
  error: string
  resetAcceptedFiles: boolean
  callback: (acceptedFiles: File[]) => Promise<void>
}

export function UploadTitle({ error, resetAcceptedFiles, callback }: UploadTitleProps): ReactElement {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    accept: AcceptedFileType.IMAGE
  } as DropzoneOptions);

  /****************************/
  /* CALLING THE POST REQUEST */
  /****************************/
  useEffect(() => {
    if (acceptedFiles.length !== 0) {
      // ts
      // console.log(`=== ACCEPTED FILES CHANGED.\nCalling Image Post callback ===`)
      callback(acceptedFiles)
    }
  }, [acceptedFiles])

  
  /***********************/
  /* RESET ACCEPTEDFILES */
  /***********************/
  useEffect(() => {
    if (resetAcceptedFiles) {
      // ts 
      // console.log(`resetAcceptedFiles = ${resetAcceptedFiles}`)
      acceptedFiles.splice(0, acceptedFiles.length)
    } else {
      // console.log(`resetAcceptedFiles = ${resetAcceptedFiles}`)
    }
  }, [resetAcceptedFiles])
  
  const getDropZoneContent = () => {
    return (
      <>
      {acceptedFiles.length === 0 ? (
        <>
        <input
          {...getInputProps()} 
        />
        <p className={styles.extraBold}>Drag & Drop</p>
        <p className={styles.extraBold}>Click & Select</p>
        </>
      ) : acceptedFiles.length === 1 ? (
          <p className={styles.extraBold}>1 image loaded</p>
      ) : (
        <>
          <input {...getInputProps()} />
          <p key={2} className={styles.extraBold}>{acceptedFiles.length} images loaded</p>
        </>
      )}
      </>
    )
  }

  return (
      <div className={styles.UploadTitle}>
        <h4 className={styles.LinksHeader}>Upload Image - <Link target="_blank" to="/image_categorization">Personal Information</Link>, <Link to="/tutorials/#uploadImage">Tutorial</Link>, <Link to="/bounties">Data Bounties</Link> </h4>
          
        {error ? (
          <>
          {error === `Please accept DataUnion's Guidelines.` ? (
            <div>
              <Alert text={error} state="guidelinesWarning" />
            </div>
          ) : (
            <div>
              <Alert text={error} state="error" />
            </div>
          )}
          </>
        ) : !error && acceptedFiles.length === 0 && (
          <div className={styles.ImagesDropZone}>
            <div {...getRootProps()} className={styles.DropZone}>
              {getDropZoneContent()}
            </div>
          </div>
        )}
          
      </div> 
    )
  }