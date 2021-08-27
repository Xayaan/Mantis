import React, { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from 'react'

interface PhotoUploadErrorContextValue {
  errors: string[]
  metadataSuccess: boolean
  metadataError: boolean
  dropzoneError: boolean

  postSuccessSignalsActivated: boolean

  setErrors: (msg: string[]) => void
  setMetadataSuccess: () => void
  setDropzoneError: (status: boolean) => void
  setUploadMetadataError: (status: boolean) => void
  
  resetUploadImageSignals: () => void
  resetMetadataSignals: () => void
}

const defaultState: PhotoUploadErrorContextValue = {
  errors: [],
  metadataSuccess: false,
  metadataError: false,
  dropzoneError: false,

  postSuccessSignalsActivated: false,

  setErrors: (errors: string[]) => {},
  setMetadataSuccess: () => {},
  setDropzoneError: (status: boolean) => {},
  setUploadMetadataError: (status: boolean) => {},
  
  resetUploadImageSignals: () => {},
  resetMetadataSignals: () => {}
}

const PhotoUploadErrorContext = createContext(defaultState)

function PhotoUploadErrorContextProvider({children}: {children: ReactNode}): ReactElement {

    const [errors, setErrors] = useState<string[]>()
    const [metadataSuccess, setMetadataSuccess] = useState<boolean>()
    const [metadataError, setMetadataError] = useState<boolean>()
    const [metadataFailedPost, setMetadataFailedPost] = useState<boolean>()
    const [dropzoneError, setDropzoneError] = useState<boolean>()
    const [postSuccessSignalsActiviated, setPostSuccessSignalsActivated] = useState<boolean>()

    const SetMetadataSuccess = () => {
      setMetadataSuccess(true)
    }

    const ResetMetadataSignals = () => {
      setMetadataSuccess(false)
    }

    const ResetUploadImageSignals = () => {
      setErrors([])
      // setMetadataError(false)
      // setDropzoneError(false)
    }

    const SetErrors = (errors: string[]) => {
      setErrors(errors)
    }

    const SetDropzoneError = (status: boolean) => {
      setDropzoneError(status)
    }

    const SetUploadMetadataError = (status: boolean) => {
      SetUploadMetadataError(status)
    }

    useEffect(() => {
      if (!metadataSuccess) {
        setPostSuccessSignalsActivated(false)
      } else {
        setPostSuccessSignalsActivated(true)
      }
    }, [])

    return (
      <PhotoUploadErrorContext.Provider value={{
        errors: errors,
        metadataSuccess: metadataSuccess,
        postSuccessSignalsActivated: postSuccessSignalsActiviated,
        dropzoneError: dropzoneError,
        metadataError: metadataError,

        setErrors: SetErrors,
        setMetadataSuccess: SetMetadataSuccess,
        setDropzoneError: SetDropzoneError,
        setUploadMetadataError: SetUploadMetadataError,

        resetUploadImageSignals: ResetUploadImageSignals,
        resetMetadataSignals: ResetMetadataSignals
      }}>
        {children}
      </PhotoUploadErrorContext.Provider>
    )
  }


const usePhotoUploadErrorContext = (): PhotoUploadErrorContextValue =>
  useContext(PhotoUploadErrorContext)

export { PhotoUploadErrorContextProvider, usePhotoUploadErrorContext, PhotoUploadErrorContextValue }
export default PhotoUploadErrorContextProvider
