import React, { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from 'react'

interface BatchUploadErrorContextValue {
  // signals for loading symbols, rendering components and re-rendering components
  loadingBatch: boolean
  refreshDropZone: boolean
  showFileBoxes: number

  // errors and successes
  tooManyImagesError: boolean
  allImagesInvalidError: boolean
  allFilesUploadedSuccess: boolean

  setLoadingBatch: (status: boolean) => void
  setRefreshDropZone: (status: boolean) => void
  setTooManyImagesError: (value: boolean) => void
  setAllImagesInvalidError: (value: boolean) => void
  setAllFilesUploadedSuccess: (value: boolean) => void
  setShowFileBoxes: (value: number) => void
  
  resetBatchUploadSignals: () => void
}

const defaultState: BatchUploadErrorContextValue = {
  // signals for loading symbols, rendering components and re-rendering components
  loadingBatch: false,
  refreshDropZone: false,
  showFileBoxes: 0,

  // errors and successes
  tooManyImagesError: false,
  allImagesInvalidError: false,
  allFilesUploadedSuccess: false,

  setLoadingBatch: (status: boolean) => {},
  setRefreshDropZone: (status: boolean) => {},
  setTooManyImagesError: (value: boolean) => {},
  setAllImagesInvalidError: (value: boolean) => {},
  setAllFilesUploadedSuccess: (value: boolean) => {},
  setShowFileBoxes: (value: number) => {},

  resetBatchUploadSignals: () => {}
}

const BatchUploadErrorContext = createContext(defaultState)

function BatchUploadErrorContextProvider({children}: {children: ReactNode}): ReactElement {
  const [loadingBatch, setLoadingBatch] = useState<boolean>()
  const [refreshDropZone, setRefreshDropZone] = useState<boolean>()
  const [showFileBoxes, setShowFileBoxes] = useState<number>()

  const [tooManyImagesError, setTooManyImagesError] = useState<boolean>()
  const [allImagesInvalidError, setAllImagesInvalidError] = useState<boolean>()
  const [allFilesUploadedSuccess, setAllFilesUploadedSuccess] = useState<boolean>()

  const SetTooManyImagesError = (value: boolean) => {
    if (value) {
      setTooManyImagesError(true)

      setAllImagesInvalidError(false)
      setAllFilesUploadedSuccess(false)
    } else {
      setTooManyImagesError(false)
    }
  }

  const SetShowFileBoxes = (value: number) => {
    setShowFileBoxes(value)
  }

  const SetLoadingBatch = (status: boolean) => {
    setLoadingBatch(status)
  }

  const SetRefreshDropZone = (status: boolean) => {
    setRefreshDropZone(status)
  }

  const SetAllImagesInvalidError = (value: boolean) => {
    if (value) {
      setAllImagesInvalidError(true)
      setTooManyImagesError(false)
    } else {
      setAllImagesInvalidError(false)
      setTooManyImagesError(false)
    }
  }

  const SetAllFilesUploadedSuccess = (value: boolean) => {
    if (value) {
      setAllFilesUploadedSuccess(true)
      setTooManyImagesError(false)
    } else {
      setAllFilesUploadedSuccess(false)
      setTooManyImagesError(false)
    }
  }

  const ResetBatchUploadSignals = () => {
    setTooManyImagesError(false)
    setAllImagesInvalidError(false)
    setAllFilesUploadedSuccess(false)
  }

    return (
      <BatchUploadErrorContext.Provider value={{
        loadingBatch: loadingBatch,
        tooManyImagesError: tooManyImagesError,
        allImagesInvalidError: allImagesInvalidError,
        allFilesUploadedSuccess: allFilesUploadedSuccess,
        showFileBoxes: showFileBoxes,
        refreshDropZone: refreshDropZone,

        setLoadingBatch: SetLoadingBatch,
        setRefreshDropZone: SetRefreshDropZone,
        setTooManyImagesError: SetTooManyImagesError, 
        setAllImagesInvalidError: SetAllImagesInvalidError,
        setAllFilesUploadedSuccess: SetAllFilesUploadedSuccess,
        setShowFileBoxes: SetShowFileBoxes,

        resetBatchUploadSignals: ResetBatchUploadSignals
      }}>
        {children}
      </BatchUploadErrorContext.Provider>
    )
  }


const useBatchUploadErrorContext = (): BatchUploadErrorContextValue =>
  useContext(BatchUploadErrorContext)

export { BatchUploadErrorContextProvider, useBatchUploadErrorContext, BatchUploadErrorContextValue }
export default BatchUploadErrorContextProvider