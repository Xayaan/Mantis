import { AnnotationImageRenderPackage, ImageRenderPackage } from '../../@types/Providers'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import { GetPhotoById } from '../../api/photo/get'
import { QueryAllMetadata } from '../../api/verify/post'
import { useAuthContext } from '../AuthProvider'
import { useAnnotationErrorContext } from './AnnotationErrorProvider'

/**********************************************************************************************/
/** Unlike in VerificationDataProvider, only one image is called at a time in this provider. **/
/*** This is for the sake of simplicity, since this data is interacting with react-annotate ***/
/**********************************************************************************************/
interface AnnotationDataContextValue {
    annotationImagesCurrentTags: string[]
    annotationImagesCurrentId: string
    annotationImageRendered: Array<AnnotationImageRenderPackage>
    loadingNextImage: boolean
    mode: 'normal' | 'anonymization bounty'
    setMode: (newMode: string) => void
    nextAnnotationSlide: () => void
}

const defaultState: AnnotationDataContextValue = {
    annotationImagesCurrentTags: [],
    annotationImagesCurrentId: "",
    annotationImageRendered: [],  
    loadingNextImage: false, 
    mode: 'normal',
    setMode: (newMode: string) => {},
    nextAnnotationSlide: () => {},
}

const AnnotationDataContext = createContext(defaultState)
const sessionStorageKey = "mantis-annotation"


function AnnotationDataContextProvider( {children} : {children: ReactNode} ) {

    // private
    const [queuedMetadata, setQueuedMetadata] = useState<any>([])                                                       // variable that stores metadata of each image.
    const [loadingNextImage, setLoadingNextImage] = useState<boolean>()
    const [metadataInitialized, setMetadataInitialized] = useState<boolean>()

    // public
    const [annotationImageRendered, setAnnotationImageRendered] = useState<Array<AnnotationImageRenderPackage>>()       // variable that's actually used to show images in the front-end. structure based on react-image-annotate library. Based on annotationImageCurrentBatch.
    const [annotationImageCurrentTags, setAnnotationImageCurrentTags] = useState<string[]>()
    const [annotationImagesCurrentId, setAnnotationImagesCurrentId] = useState<string>()
    const [mode, setMode] = useState<'normal' | 'anonymization bounty'>('normal')

    const { accessToken, executingRefresh, setNeedToRefreshTokenError } = useAuthContext()

    const {
        ended,
        noMoreData,
        changingMode,
        setNoMoreData,
        setEnded,
        setChangingMode
    } = useAnnotationErrorContext()


    /***************/
    /*** SETTERS ***/
    /***************/
    const SetQueuedMetadata = (metadata: any) => {
        setQueuedMetadata(metadata)
    }

    /**************/
    /*** PUBLIC ***/
    /**************/
    const SetAnnotationImageRendered = (images: AnnotationImageRenderPackage[]) => {
        setAnnotationImageRendered(images)
    }

    const SetAnnotationImageCurrentTags = (tags: string[]) => {
        setAnnotationImageCurrentTags(tags)
    }

    const SetAnnotationImageCurrentId = (id: string) => {
        setAnnotationImagesCurrentId(id)
    }

    const SetLoadingNextImage = (status: boolean) => {
        // console.log(`LOADING NEXT IMAGE SETTING TO ${status}`)
        setLoadingNextImage(status)
    }

    const SetMode = (newMode: 'normal' | 'anonymization bounty') => {
        setMode(newMode)
    }

    const SetMetadataInitialized = (status: boolean) => {
        setMetadataInitialized(status)
    }


    // loads the next queued image when signalled
    const SetNextAnnotationSlide = () => {
        if (queuedMetadata.length !== 0 && queuedMetadata !== undefined) {
            _LoadNewImage()
        } else if (queuedMetadata.length === 0) {
            setNoMoreData(true)
        }

        // TODO: Set Ended
        if (!queuedMetadata && noMoreData) {
            setEnded(true)
        }
    }


    /*****************/
    /*** API CALLS ***/
    /*****************/

    // calls query_metadata
    const _callAnnotationImageMetadata = (mode: string) => {
        /*** Fills queuedMetadata. Only called on init. ***/
        if (accessToken) {
            const page = 1
            const status = 'VERIFIABLE'
            const type = "BoundingBox"
            
            if (mode === 'normal') {
                QueryAllMetadata(accessToken, status, page, type).then(jsonResult => {
                    // console.log(jsonResult)
                    if (jsonResult["msg"] === "Token has expired") {
                        setNeedToRefreshTokenError(true)
                    } 
                    
                    if (jsonResult.result.length === 0 && jsonResult["msg"] !== "Token has expired") {
                        setNoMoreData(true)
                        setEnded(true)
                        setChangingMode(false)
                        SetMetadataInitialized(true)
                    } else if (jsonResult["msg"] !== "Token has expired") {
                        if (jsonResult.result.length > 1) {
                            // shuffle array & remove tagless images
                            for (var i = jsonResult.result.length - 1; i > 0; i--) {
                                var j = Math.floor(Math.random() * (i + 1));
                                var temp = jsonResult.result[i];
                                jsonResult.result[i] = jsonResult.result[j];
                                jsonResult.result[j] = temp;
    
                                if (jsonResult.result[i].tag_data.length === 0) {
                                    jsonResult.result.splice(i, 1) 
                                }
                            }
    
                            _InitializeImageRenderPackage(jsonResult.result.slice(0, 1))
                            SetQueuedMetadata(jsonResult.result.slice(1, jsonResult.result.length))
                            SetMetadataInitialized(true)
    
                        } else if (jsonResult.result.length === 1) {
                            SetQueuedMetadata([])
                            if (jsonResult.result[0].tag_data.length === 0 || !jsonResult.result[0].tag_data.includes("anonymization bounty")) {
                                jsonResult.result.splice(i, 1)
                                setEnded(true)
                            } else if (jsonResult.result[0].tag_data.includes("anonymization bounty")) {
                                _InitializeImageRenderPackage(jsonResult.result.slice(0, 1))
                            }
                            SetMetadataInitialized(true)
                        } 
                    } 
                }).catch(err => {
                    // console.log(err)
                })
            } else if (mode === 'anonymization bounty') {
                QueryAllMetadata(accessToken, status, page, type).then(jsonResult => {
                    // console.log(jsonResult)
                    if (jsonResult["msg"] === "Token has expired") {
                        setNeedToRefreshTokenError(true)
                    } 
                    
                    if (jsonResult.result.length === 0 && jsonResult["msg"] !== "Token has expired") {
                        setNoMoreData(true)
                        setEnded(true)
                        setChangingMode(false)
                        SetMetadataInitialized(true)
                    } else if (jsonResult.result.length > 1 && jsonResult["msg"] !== "Token has expired") {
                        // shuffle array & remove tagless images
                        for (var i = jsonResult.result.length - 1; i > 0; i--) {                            
                            var j = Math.floor(Math.random() * (i + 1));
                            var temp = jsonResult.result[i];
                            jsonResult.result[i] = jsonResult.result[j];
                            jsonResult.result[j] = temp;

                            if (jsonResult.result[i].tag_data.length === 0 || !jsonResult.result[i].tag_data.includes("anonymization bounty")) {
                                jsonResult.result.splice(i, 1)
                            }

                            if (i === 1) {
                                if (jsonResult.result[0].tag_data.length === 0 || !jsonResult.result[0].tag_data.includes("anonymization bounty")) {
                                    jsonResult.result.splice(0, 1)
                                }
                                _InitializeImageRenderPackage(jsonResult.result.slice(0, 1))
                                SetQueuedMetadata(jsonResult.result.slice(1, jsonResult.result.length))
                                SetMetadataInitialized(true)
                            }
                        }

                    } else if (jsonResult.result.length === 1 && jsonResult["msg"] !== "Token has expired") {
                        SetQueuedMetadata([])
                        if (jsonResult.result[0].tag_data.length === 0 || !jsonResult.result[0].tag_data.includes("anonymization bounty")) {
                            jsonResult.result.splice(i, 1)
                            setEnded(true)
                        } else if (jsonResult.result[0].tag_data.includes("anonymization bounty")) {
                            _InitializeImageRenderPackage(jsonResult.result.slice(0, 1))
                        }
                        SetMetadataInitialized(true)
                    }
                })
                .catch(err => {
                    // console.log(err)
                })
            }
        }
    }

    
    // Calls API
    const _LoadNewImage = (): any => {
        // console.log(`Load New Image triggered.`)
        SetLoadingNextImage(true)
        if (queuedMetadata.length !== 0) {
            const imageRenderPackage: ImageRenderPackage[] = []

            // if there are tags on it, call the GetPhoto api.
            queuedMetadata.slice(0, 1).forEach(async(metadataItem: any, i: number) => {                
                const blobResult = await GetPhotoById(accessToken, metadataItem.image_id)
                const imageurl = await URL.createObjectURL(blobResult)
                
                const object: ImageRenderPackage = {
                    photoId: metadataItem.image_id,
                    imageUrl: imageurl,
                    tags: metadataItem.tag_data,
                    description: metadataItem.descriptions[0]
                }

                imageRenderPackage.push(object)

                // Slice Metadata Stack
                if (imageRenderPackage.length === queuedMetadata.slice(0, 1).length) {
                    SetAnnotationImageCurrentTags(imageRenderPackage[0].tags)
                    SetAnnotationImageCurrentId(imageRenderPackage[0].photoId)
                    _SetAnnotationImageRendered(imageRenderPackage)
                }

                SetQueuedMetadata(queuedMetadata.slice(1, queuedMetadata.length))
                // ts
                // console.log(`queuedMetadata spliced. queuedMetadata length = ${queuedMetadata.length}`)
            })
        } else {
            console.log(`[VerificationDataProvider.tsx] ERROR: No Queued Metadata`)
        }
    }

    // Calls .tags
    const _InitializeImageRenderPackage = (images: any[]) => {
        // ts
        // console.log(`INITIALIZING IMAGE RENDER PACKAGE...`)
        // console.log(images)

        const firstImageRenderPackage: ImageRenderPackage[] = []
        images.forEach(async(metadataItem: any, i: number) => {

            const blobResult = await GetPhotoById(accessToken, metadataItem.image_id)
            const imageurl = await URL.createObjectURL(blobResult)

            const object: ImageRenderPackage = {
                photoId: metadataItem.image_id,
                imageUrl: imageurl,
                tags: metadataItem.tag_data,
                description: metadataItem.descriptions[0]
            }

            firstImageRenderPackage.push(object)
            if (firstImageRenderPackage.length === images.length) {
                SetAnnotationImageCurrentTags(firstImageRenderPackage[0].tags)
                SetAnnotationImageCurrentId(firstImageRenderPackage[0].photoId)
                _SetAnnotationImageRendered(firstImageRenderPackage)
                setChangingMode(false)
            }
            
        })
    }

    // Puts image into appropriate format for rendering in react-annotate
    const _SetAnnotationImageRendered = (images: ImageRenderPackage[]) => {
        const imagesRendered: Array<AnnotationImageRenderPackage> = []
        images.forEach((metadataItem: any, i: number) => {
            const object: AnnotationImageRenderPackage = {
                src: metadataItem.imageUrl,
                name: "",
                regions: []
            }

            imagesRendered.push(object)
            if (imagesRendered.length === images.length) {
                SetAnnotationImageRendered(imagesRendered)
                SetLoadingNextImage(false)
            }
        })
    }


    // INITIALIZE: On Refresh or Page Visit
    // metadataInitialized prevents init func from calling again when the token refreshes in background
    useEffect(() => { 
        if (accessToken && mode && executingRefresh === false && !metadataInitialized) {
            // console.log(`=== CALLING INITIALIZE METADATA (ANNOTATION) ===`)
            _callAnnotationImageMetadata(mode)
        }
    }, [JSON.stringify(accessToken), executingRefresh])


    // INITIALIZE: When mode changes.
    useEffect(() => {
        if (mode && executingRefresh === false) {
            if (metadataInitialized) {
                setChangingMode(true)
            }
            const modeVar = mode.toLocaleLowerCase()            
            _callAnnotationImageMetadata(modeVar)
        }
    }, [mode, executingRefresh])


    return (
        <AnnotationDataContext.Provider value={{
            annotationImagesCurrentTags: annotationImageCurrentTags,
            annotationImagesCurrentId: annotationImagesCurrentId,
            annotationImageRendered: annotationImageRendered,
            loadingNextImage: loadingNextImage,
            mode: mode,
            nextAnnotationSlide: SetNextAnnotationSlide,
            setMode: SetMode
        }}>
            {children}
        </AnnotationDataContext.Provider>
    )
}

const useAnnotationDataContext = (): AnnotationDataContextValue =>
  useContext(AnnotationDataContext)

export { AnnotationDataContextProvider, useAnnotationDataContext, AnnotationDataContextValue }
export default AnnotationDataContextProvider

