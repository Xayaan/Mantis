import { ImageRenderPackage } from '../../@types/Providers'
import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react'

import { GetPhotoById } from '../../api/photo/get'
import { GetWords } from '../../api/staticdata'
import { QueryAllMetadata } from '../../api/verify/post'
import { useAuthContext } from '../AuthProvider'
import { useVerificationErrorContext } from './VerificationErrorProvider'

/// VERIFICATION LOADING SYSTEM LOGIC
    // BatchInterval is set (i.e. a low number like 3).
    // 100 metadatas are loaded from a random page.
    // Metadatas are shuffed and set.
    // Verification indicies array are generated: 1-100 (or 1 - array length). 
    // Verification indicies array STATIC until a new call to QueryMetadata is made.
    // if currentVerificationIndex % interval === 0: Load new data into ImageRenderPackage (renderPackage.length = interval + 1 elements)
    // if currentVerificationIndex % interval === 1 && currentVerificationIndex < interval: Pop first element from ImageRenderPackage (renderPackage.length = interval elements)

interface VerificationDataContextValue {
    verificationImageRenderPackage: ImageRenderPackage[]
    queuedMetadata?: any[]
    currentVerificationIndex: number
    batchInterval: number
    awaitingBatchNotLoaded: boolean
    setCurrentVerificationIndex: (current_index: number) => void
    clearVerificationImages: () => void
    
    checkList: string[]
    badWords: string[]

    addedTags: string[]
    addedDescription: string

    addAddedTag: (added_tag: string) => void
    removeAddedTag: (removed_tag: string) => void
    resetAddedTags: () => void
    addAddedDescription: (added_description: string) => void
    removeAddedDescription: (removed_description: string) => void

    setStatus: (status: 'tagging' | 'verifying') => void
}

const defaultState: VerificationDataContextValue = {
    verificationImageRenderPackage: [],
    queuedMetadata: [],
    currentVerificationIndex: undefined,
    batchInterval: 0,
    awaitingBatchNotLoaded: true,
    setCurrentVerificationIndex: (current_index: number) => {},
    clearVerificationImages: () => {},

    checkList: [],
    badWords: [],

    addedTags: [],
    addedDescription: undefined,
    addAddedTag: (added_tag: string) => {},
    removeAddedTag: (removed_tag: string) => {},
    resetAddedTags: () => {},
    addAddedDescription: (added_description: string) => {},
    removeAddedDescription: (removed_description: string) => {},

    setStatus: (status: 'tagging' | 'verifying') => {}
}


const VerificationDataContext = createContext(defaultState)
const sessionStorageKey = "mantis-verification"

function getSessionStorage(): VerificationDataContextValue {
    const storageParsed =
      typeof window !== 'undefined' &&
      JSON.parse(window.sessionStorage.getItem(sessionStorageKey))
    return storageParsed
}
  
function setSessionStorage(values: Partial<VerificationDataContextValue>) {
    return (
      typeof window !== 'undefined' &&
      window.sessionStorage.setItem(sessionStorageKey, JSON.stringify(values))
    )
}


function VerificationDataContextProvider( {children} : {children: ReactNode} ) {
    const [batchInterval, setBatchInterval] = useState<number>(3)
    const [awaitingBatchNotLoaded, setAwaitingBatchNotLoaded] = useState<boolean>(true)
    
    // control signals (private)
    const [metadataInitialized, setMetadataInitialized] = useState<boolean>()
    const [callLength, setCallLength] = useState<number>()
    const [awaitingBatch, setAwaitingBatch] = useState<ImageRenderPackage[]>()
    const [status, setStatus] = useState<'tagging' | 'verifying'>()
    
    // dropdown lists (private)
    const [checkList, setCheckList] = useState<string[]>()
    const [badWords, setBadWords] = useState<string[]>()

    // public
    const [verificationImageRenderPackage, setImageRenderPackage] = useState<ImageRenderPackage[]>()    // The thing currently showing
    const [currentVerificationIndex, setCurrentVerificationIndex] = useState<number>(0)
    const [addedTags, setAddedTags] = useState<string[]>([])
    const [addedDescription, setAddedDescription] = useState<string>()

    // private
    const [queuedMetadata, setQueuedMetadata] = useState<any>([])

    // access token
    const { accessToken, executingRefresh, setNeedToRefreshTokenError } = useAuthContext()

    // setting errors
    const {
        ended,
        setLoadingBatch,
        setNoMoreData,
        setEnded
    } = useVerificationErrorContext()

    const SetCheckList = (checkList: string[]) => {
        setCheckList(checkList)
    }

    const SetBadWords = (badWords: string[]) => {
        setBadWords(badWords)
    }


    // TODO: Remove bandaid checklist. replace with real checklist from backend.
    useEffect(() => {
        if (!checkList) {
            GetWords('RECOMMENDED_WORDS').then(res => {
                // console.log(res.data.result)
                SetCheckList(res.data.result)
            })
        }
    }, [checkList])

    useEffect(() => {
        if (!badWords) {
            GetWords('BANNED_WORDS').then(res => {
                // console.log(res.data.result)
                SetBadWords(res.data.result)
            })
        }
    }, [badWords])


    /*************/
    /** SETTERS **/
    /*************/
    const SetImageRenderPackage = (image_render_package: ImageRenderPackage[]) => {
        setImageRenderPackage(image_render_package)
    }

    const SetQueuedMetadata = (queued_metadata: any[]) => {
        setQueuedMetadata(queued_metadata)
    }

    const SetCallLength = (call_length: number) => {
        setCallLength(call_length)
    }

    const SetBatchInterval = (batch_interval: number) => {
        setBatchInterval(batch_interval)
    }

    const SetAwaitingBatchNotLoaded = (status: boolean) => {
        setAwaitingBatchNotLoaded(status)
    }

    const SetCurrentVerificationIndex = (current_index: number) => {
        setCurrentVerificationIndex(current_index)
    }

    const SetAwaitingBatch = (awaiting_batch: ImageRenderPackage[]) => {
        setAwaitingBatch(awaiting_batch)
    }


    // TODO 
    // Recycle this logic 
    // If queuedMetadata.length !== 0
    const InitializeImageRenderPackage = (images: any[]) => {
        const firstImageRenderPackage: ImageRenderPackage[] = []
        images.forEach(async(metadataItem: any, i: number) => {
            
            // console.log(`i = ${i}`)
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
                SetImageRenderPackage(firstImageRenderPackage)
            }
            
        })
    }

    const InitializeMetadata = () => {
        // console.log(`VERIFICATION PROVIDER executingRefresh = ${executingRefresh}`)
        if (accessToken && executingRefresh === false && !metadataInitialized) {
            // TODO
            // Make count a global variable called when the app loads.
            const page = 1
            const status = 'VERIFIABLE'
            
            // const page = Math.ceil(Math.random() * Math.ceil(count / 100));    // loop through pages until jsonResult.result is blank.
            
            QueryAllMetadata(accessToken, status, page).then(jsonResult => {
                // ts
                // console.log(`=== METADATA RETREIVED ===\n`)
                // console.log(jsonResult)
                // console.log(jsonResult["msg"])
                // console.log(jsonResult["msg"] === "Token has expired")

                if (jsonResult["msg"] === "Token has expired") {
                    console.log(`setting NEEDTOREFRESHTOKENERROR...`)
                    setNeedToRefreshTokenError(true)
                }

                if (jsonResult.result.length === 0 && jsonResult["msg"] !== "Token has expired") {
                    setNoMoreData(true)
                    setEnded(true)
                    SetMetadataInitialized(true)
                } else if (jsonResult["msg"] !== "Token has expired") {
                    // ts
                    // console.log(`SHUFFLED METADATA = `)
                    // console.log(jsonResult.result)

                    if (jsonResult.result.length > batchInterval) {
                        
                        SetCallLength(jsonResult.result.length - batchInterval)

                        // shuffle array
                        for (var i = jsonResult.result.length - 1; i > 0; i--) {
                            var j = Math.floor(Math.random() * (i + 1));
                            var temp = jsonResult.result[i];
                            jsonResult.result[i] = jsonResult.result[j];
                            jsonResult.result[j] = temp;
                        }

                        InitializeImageRenderPackage(jsonResult.result.slice(0, batchInterval))
                        SetQueuedMetadata(jsonResult.result.slice(batchInterval, jsonResult.result.length))
                        SetMetadataInitialized(true)
                        
                    } else {
                        SetQueuedMetadata([])
                        SetCallLength(0)

                        // shuffle array
                        for (var i = jsonResult.result.length - 1; i > 0; i--) {
                            var j = Math.floor(Math.random() * (i + 1));
                            var temp = jsonResult.result[i];
                            jsonResult.result[i] = jsonResult.result[j];
                            jsonResult.result[j] = temp;
                        }

                        InitializeImageRenderPackage(jsonResult.result)
                        SetMetadataInitialized(true)
                    } 
                }
            }).catch(err => {
                // console.log(err)
            })
        } else {
            console.log(`Couldn't initialize metadata.`)
        }
    }

    // Loads a new batch into verificationImageRenderPackage
    const loadNewBatch = () => {
        // console.log(`Load New Batch triggered.\nInterval = ${batchInterval}`)
        if (queuedMetadata.length !== 0) {
            const imageRenderPackage: ImageRenderPackage[] = []
            
            // ts
            // console.log(queuedMetadata)
            // console.log(queuedMetadata.slice(0, batchInterval))

            queuedMetadata.slice(0, batchInterval).forEach(async(metadataItem: any, i: number) => {
                // ts
                // console.log(`PLEASE WAIT FOR THE NEXT BATCH TO LOAD...`)
                // console.log(`==== LOOPING THRU QUEUED METADATA TO CALL PHOTO ====`)

                const blobResult = await GetPhotoById(accessToken, metadataItem.image_id)
                const imageurl = await URL.createObjectURL(blobResult)
                
                const object: ImageRenderPackage = {
                    photoId: metadataItem.image_id,
                    imageUrl: imageurl,
                    tags: metadataItem.tag_data,
                    description: metadataItem.descriptions[0]
                }

                imageRenderPackage.push(object)
                if (imageRenderPackage.length === queuedMetadata.slice(0, batchInterval).length) {
                    SetAwaitingBatch(imageRenderPackage)
                    SetAwaitingBatchNotLoaded(false)
                    queuedMetadata.slice(1, queuedMetadata.length)
                }

                SetQueuedMetadata(queuedMetadata.slice(1, queuedMetadata.length))
                // console.log(`queuedMetadata spliced. queuedMetadata length = ${queuedMetadata.length}`)
            })
        } else {
            console.log(`[VerificationDataProvider.tsx] ERROR: No Queued Metadata`)
        }
    }


    // Initialize Metadata via API call.
    useEffect(() => {
        if (accessToken && executingRefresh === false && !ended && !metadataInitialized) {
            console.log(`=== CALLING INITIALIZE METADATA (VERIFICATION) ===`)
            InitializeMetadata()
        }
    }, [JSON.stringify(accessToken), executingRefresh])


    // load new batch
    useEffect(() => {
        // console.log(`[VerificationDataProvider.tsx] currentVerificationIndex = ${currentVerificationIndex}`)
        if (queuedMetadata.length !== 0 && queuedMetadata !== undefined) {
            
            // last image: start loading awaiting batch
            if (queuedMetadata.length !== callLength && queuedMetadata.length !== 0 && currentVerificationIndex === batchInterval -1) {
                // console.log(`CREATING IMAGEURLS FOR NEW BATCH... `)
                loadNewBatch()
            }

            // user has restarted the batch. load awaitingBatch into 
            else if (queuedMetadata.length !== callLength && queuedMetadata.length !== 0 && currentVerificationIndex === 0) {
                // console.log(`LOADING NEW BATCH... `)
                setLoadingBatch(true)
                SetImageRenderPackage(awaitingBatch)
                setLoadingBatch(false)

                // pop used image off the metadata stack.
                SetQueuedMetadata(queuedMetadata.slice(1, queuedMetadata.length))
                // console.log(`queuedMetadata spliced. queuedMetadata length = ${queuedMetadata.length}`)
            } 
            
            // it is not the first or last image of the batch
            else {
                SetQueuedMetadata(queuedMetadata.slice(1, queuedMetadata.length))
                // console.log(`queuedMetadata spliced. queuedMetadata length = ${queuedMetadata.length}`)
            }
        } 
        // ts
        // else {
        //     console.log(`Queued Metadata is blank.`)
        // }


        // SECURITY MEASURE
        if (verificationImageRenderPackage) {
            if (currentVerificationIndex > verificationImageRenderPackage.length) {
                setCurrentVerificationIndex(0)
            }
        }

        // Setting noMoreData, then setting Ended on the next render.
        if (!queuedMetadata && verificationImageRenderPackage) {
            if ((currentVerificationIndex === verificationImageRenderPackage.length - 1) || (verificationImageRenderPackage.length === 1)) {
                console.log(`NO MORE DATA... `)
                setNoMoreData(true)
            }
        }
        if (queuedMetadata && verificationImageRenderPackage) {
            // console.log(`SETTING NOMOREDATA TO TRUE WITH COMPLEX CONDITION... `)
            if ((queuedMetadata.length === 0 && currentVerificationIndex === verificationImageRenderPackage.length - 1) || (verificationImageRenderPackage.length === 0)) {
                console.log(`NO MORE DATA.. `)
                setNoMoreData(true)
            }
        }

        resetAddedTags()
        resetAddedDescription()
    }, [currentVerificationIndex])


    // When verificationImageRenderPackage is changed, awaiting batch is reset to blank.
    useEffect(() => {
        if (verificationImageRenderPackage !== undefined && verificationImageRenderPackage.length !== 0) {
            // console.log(`==== NEW BATCH COMPLETELY LOADED. AwaitingBatch reset, ready for next lot. ====`)
            SetAwaitingBatchNotLoaded(true)
            SetAwaitingBatch([])
            // UNIT TEST


            // ts
            // console.log(`=== VerificationImageRenderPackage DEFINED ===`)
            // console.log(`Package: `)
            // console.log(verificationImageRenderPackage)
            // console.log(`Package Length: ${verificationImageRenderPackage.length}`)
        }
    }, [verificationImageRenderPackage])


    /****************************************************************************/
    /* ADDING TAGS AND DESCRIPTIONS. Recycled code from PhotoUploadProvider.tsx */
    /****************************************************************************/
    const tagsRef = useRef<string[]>()
    useEffect(() => {
        tagsRef.current = addedTags
        // console.log(`[VDataProvider] addedTags changed. addedTags = `)
        // console.log(addedTags)
    }, [addedTags])

    const addAddedTag = (new_tag: string, existing_tags?: string[]) => {
        // console.log(`ADDADDEDTAG TRIGGERED`)
        // console.log(existing_tags)
          
        // create a toLowerCase list
        // TODO: Find more efficient method than turning them all lowercase every time
        var tags_lower_case: string[] = []
        for (var tag of tagsRef.current) {
            const lowered_tag = tag.toLowerCase()
            tags_lower_case.push(lowered_tag)
        }

        var existing_tags_lower_case: string[] = []
        for (var tag of existing_tags) {
            const lowered_tag = tag.toLocaleLowerCase()
            existing_tags_lower_case.push(lowered_tag)
        }

        // ts
        // console.log(`tags_lower_case`)
        // console.log(tags_lower_case)
        // console.log(`existing_tags_lower_case`)
        // console.log(existing_tags_lower_case)
        // console.log(`tagsRef.current`)
        // console.log(tagsRef.current)
        // console.log(`EXISTING TAGS`)
        // console.log(existing_tags)
        // console.log(`NEW_TAG`)
        // console.log(new_tag.toLowerCase())

        // splits tag by commas
        var new_tag_stack = new_tag.split(',');
        new_tag_stack = [...new Set(new_tag_stack)]
        var buffer_tag_stack = new Array();
        // console.log(new_tag_stack)
        for (var i = 0; i < new_tag_stack.length; i++) {
            // adds tag to buffer_tag_stack if it isn't in tagsRef.current
            if (!tags_lower_case.includes(new_tag_stack[i].trim().toLowerCase()) && !existing_tags_lower_case.includes(new_tag_stack[i].trim().toLowerCase()) && new_tag_stack[i].trim() !== '') { 
                buffer_tag_stack.push(new_tag_stack[i].trim());
            } else {
                console.log(`This tag already exists!`)
                // setIsDouble(true)
                // setInterval(function() { 
                //     setIsDouble(false)
                // }, 5000)
            }
        }

        if (tagsRef.current) {
            const newList = tagsRef.current.concat(buffer_tag_stack)
            setAddedTags(newList)
        } else {
            const newList = buffer_tag_stack
            setAddedTags(newList)
        }
      }
    
    const removeAddedTag = (removed_tag: string) => {
        if (tagsRef.current !== undefined) {
            setAddedTags(tagsRef.current.filter(tag => tag !== removed_tag))
        }
    }
    
    const addAddedDescription = (new_description: string) => {
        setAddedDescription(new_description)
    }

    const removeAddedDescription = () => {
        setAddedDescription('')
    }

    /***************/
    /** RESETTERS **/
    /***************/
    const resetAddedTags = () => {
        const newList: string[] = []
        setAddedTags(newList)
    }

    const resetAddedDescription = () => {
        setAddedDescription('')
    }
    
    const clearVerificationImages = () => {
        const blankArray: ImageRenderPackage[] = []
        setImageRenderPackage(blankArray)
    }

    const SetStatus = (status: 'tagging' | 'verifying') => {
        setStatus(status)
    }

    const SetMetadataInitialized = (status: boolean) => {
        setMetadataInitialized(status)
    }


    return (
        <VerificationDataContext.Provider value={{
            // DATA CONTROL
            verificationImageRenderPackage: verificationImageRenderPackage,
            currentVerificationIndex: currentVerificationIndex,
            batchInterval: batchInterval,
            awaitingBatchNotLoaded: awaitingBatchNotLoaded,
            setCurrentVerificationIndex: SetCurrentVerificationIndex,
            clearVerificationImages: clearVerificationImages,

            // WORD LISTS
            checkList: checkList,
            badWords: badWords,

            // DATA ADDING BY USERS
            addedTags: addedTags,
            addedDescription: addedDescription,
            addAddedTag: addAddedTag,
            removeAddedTag: removeAddedTag,
            resetAddedTags: resetAddedTags,
            addAddedDescription: addAddedDescription,
            removeAddedDescription: removeAddedDescription,

            setStatus: SetStatus
        }}>
            {children}
        </VerificationDataContext.Provider>
    )
}

const useVerificationDataContext = (): VerificationDataContextValue =>
  useContext(VerificationDataContext)

export { VerificationDataContextProvider, useVerificationDataContext, VerificationDataContextValue }
export default VerificationDataContextProvider

