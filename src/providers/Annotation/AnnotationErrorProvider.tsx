import React, { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from 'react'

interface ErrorContextValue {
  loadingNextImage: boolean
  reportingImage: boolean
  couldntLoadImages: boolean
  changingMode: boolean
  noMoreData: boolean
  ended: boolean
  
  setLoadingNextImage: (loadingImage: boolean) => void
  setReportingImage: (status: boolean) => void
  setCouldntLoadImages: (status: boolean) => void
  setChangingMode: (status: boolean) => void

  setNoMoreData: (status: boolean) => void
  setEnded: (status: boolean) => void
}

const defaultState: ErrorContextValue = {
  loadingNextImage: false,
  reportingImage: false,
  couldntLoadImages: false,
  changingMode: false,
  noMoreData: false,
  ended: false,

  setLoadingNextImage: (loadingImage: boolean) => {},
  setReportingImage: (status: boolean) => {},
  setCouldntLoadImages: (status: boolean) => {},
  setChangingMode: (status: boolean) => {},

  setNoMoreData: (status: boolean) => {},
  setEnded: (status: boolean) => {},
}

const AnnotationErrorContext = createContext(defaultState)

function AnnotationErrorContextProvider({children}: {children: ReactNode}): ReactElement {
  const [loadingNextImage, setLoadingNextImage] = useState<boolean>()
  const [reportingImage, setReportingImage] = useState<boolean>(false)
  const [couldntLoadImages, setCouldntLoadImages] = useState<boolean>()
  const [changingMode, setChangingMode] = useState<boolean>(false)

  const [noMoreData, setNoMoreData] = useState<boolean>(false)
  const [ended, setEnded] = useState<boolean>(false)

  /*************/
  /** SETTERS **/
  /*************/
  const SetLoadingNextImage = (status: boolean) => {
    setLoadingNextImage(status)
  }

  const SetReportingImage = (status: boolean) => {
    setReportingImage(status)
  }

  const SetCouldntLoadImages = (status: boolean) => {
    setCouldntLoadImages(status)
  }

  const SetChangingMode = (status: boolean) => {
    // console.log(`changing mode to ${status}...`)
    setChangingMode(status)
  }

  const SetNoMoreData = (status: boolean) => {
    setNoMoreData(status)
  }

  const SetEnded = (status: boolean) => {
    setEnded(status)
  }

  // ts
  // useEffect(() => {
  //   console.log(`=== PROVIDER ===\nchangingMode changed.`)
  // }, [changingMode])
  

  return (
    <AnnotationErrorContext.Provider value={{
        loadingNextImage: loadingNextImage,
        reportingImage: reportingImage,
        couldntLoadImages: couldntLoadImages,
        changingMode: changingMode,
        noMoreData: noMoreData,
        ended: ended,

        setLoadingNextImage: SetLoadingNextImage,
        setReportingImage: SetReportingImage,
        setCouldntLoadImages: SetCouldntLoadImages,
        setChangingMode: SetChangingMode,

        setNoMoreData: SetNoMoreData,
        setEnded: SetEnded,
      }}>
        {children}
      </AnnotationErrorContext.Provider>
    )
  }


const useAnnotationErrorContext = (): ErrorContextValue =>
  useContext(AnnotationErrorContext)

export { AnnotationErrorContextProvider, useAnnotationErrorContext, ErrorContextValue }
export default AnnotationErrorContextProvider