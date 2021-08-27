import React, { createContext, ReactElement, ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { useBatchUploadDataContext } from './BatchUploadDataProvider'

interface BatchUploadContextValue {  
  overallTags: string[]
  currentTags: string[]
  overallDescription: string
  currentDescription: string
  
  // On Current Image in Drawer
  addTagOnCurrent: (new_tag: string) => void
  removeTagOnCurrent: (removed_tag: string) => void
  resetTagsOnCurrent: () => void

  addDescriptionOnCurrent: (new_description: string) => void
  removeDescriptionOnCurrent: (removed_description: string) => void
  resetDescriptionOnCurrent: () => void

  // For All Images in the drawer
  addTagForAll: (new_tag: string) => void
  removeTagForAll: (removed_tag: string) => void
  resetTagsForAll: () => void

  addDescriptionForAll: (added_description: string) => void
  removeDescriptionForAll: (removed_description: string) => void
  resetDescriptionForAll: () => void

  // utils
  setPermissionToReplaceAll: (status: boolean) => void
  setPermissionToDeleteAll: (status: boolean) => void
}

const defaultState: BatchUploadContextValue = {
  overallTags: [],
  currentTags: [],
  overallDescription: "",
  currentDescription: "",
  
  // On Current Image in Drawer
  addTagOnCurrent: (new_tag: string) => {},
  removeTagOnCurrent: (removed_tag: string) => {},
  resetTagsOnCurrent: () => {},

  addDescriptionOnCurrent: (new_description: string) => {},
  removeDescriptionOnCurrent: (removed_description: string) => {},
  resetDescriptionOnCurrent: () => {},

  // For All Images in the drawer
  addTagForAll: (new_tag: string) => {},
  removeTagForAll: (removed_tag: string) => {},
  resetTagsForAll: () => {},

  addDescriptionForAll: (added_description: string) => {},
  removeDescriptionForAll: (removed_description: string) => {},
  resetDescriptionForAll: () => {},

  // utils
  setPermissionToReplaceAll: (status: boolean) => {},
  setPermissionToDeleteAll: (status: boolean) => {}
} 

const BatchUploadContext = createContext(defaultState)
const localStorageKey = "mantis-upload-provider"

// function getLocalStorage(): PhotoUploadContextValue {
//   const storageParsed =
//     typeof window !== 'undefined' &&
//     JSON.parse(window.localStorage.getItem(localStorageKey))
//   console.log(storageParsed)
//   return storageParsed
// }

// function setLocalStorage(values: Partial<PhotoUploadContextValue>) {
//   return (
//     typeof window !== 'undefined' &&
//     window.localStorage.setItem(localStorageKey, JSON.stringify(values))
//   )
// }

function BatchUploadContextProvider({children}: {children: ReactNode}): ReactElement {
    // const localStorage = getLocalStorage()
    const [overallTags, setOverallTags] = useState<string[]>()
    const [currentTags, setCurrentTags] = useState<string[]>([])
    const [overallDescription, setOverallDescription] = useState<string>('')                    // Since there can only be one description at a time, this becomes the DEFAULT description. Images without a unique description adopt this one.
    const [currentDescription, setCurrentDescriptions] = useState<string>('')
    const [showWarningPopup, setShowWarningPopup] = useState<string>('')                        // Shows when user clicks one of the "remove all" buttons
    
    const [permissionToDeleteAll, setPermissionToDeleteAll] = useState<boolean>(false)
    const [permissionToReplaceAll, setPermissionToReplaceAll] = useState<boolean>(false)

    const { 
        currentBatchUploadIndex,
        batchUploadImageRenderPackage,
        updateImageRenderPackageTags,
        updateImageRenderPackageDescriptions
    } = useBatchUploadDataContext()

    const SetPermissionToDeleteAll = (status: boolean) => {
        setPermissionToDeleteAll(status)
    }

    const SetPermissionToReplaceAll = (status: boolean) => {
        setPermissionToReplaceAll(status)
    }

    /**********************************************/
    /*** Save Current Data & Move to Next Image ***/
    /**********************************************/
    useEffect(() => {
        // updateImageRenderPackageTags('current', currentTags)
        // updateImageRenderPackageDescriptions('current', currentDescription)

        if (batchUploadImageRenderPackage[currentBatchUploadIndex] !== undefined) {
            const currentTags = batchUploadImageRenderPackage[currentBatchUploadIndex].tags.filter((item) => !overallTags.includes(item))
            setCurrentTags(currentTags)
            setCurrentDescriptions(batchUploadImageRenderPackage[currentBatchUploadIndex].description)
        }
    }, [currentBatchUploadIndex])


    /***********************************/
    /*** UPDATE CALLS (OVERALL DATA) ***/
    /***********************************/
    const currentTagsRef = useRef<string[]>()
    useEffect(() => {
        currentTagsRef.current = currentTags
        updateImageRenderPackageTags('current', currentTags)
    }, [currentTags])

    useEffect(() => {
        updateImageRenderPackageDescriptions('current', currentDescription)
    }, [currentDescription])

    const overallTagsRef = useRef<string[]>()
    useEffect(() => {
        updateImageRenderPackageTags('overall', overallTags)
        overallTagsRef.current = overallTags
    }, [overallTags])

    useEffect(() => {
        updateImageRenderPackageDescriptions('overall', overallDescription)
    }, [overallDescription])



    /*****************************/
    /*** CURRENT INDEX EDITORS ***/
    /*****************************/
    const addTagOnCurrent = (new_tag: string) => {
        console.log(`ADDING TAG TO CURRENT IMAGE.`)
        if (currentTagsRef.current !== undefined && overallTagsRef.current !== undefined) {                         // both arrays are defined
            if (!overallTagsRef.current.includes(new_tag) && !currentTagsRef.current.includes(new_tag)) {
                const newList = currentTagsRef.current.concat([new_tag])
                setCurrentTags(newList)
            }
        } else if (currentTagsRef.current !== undefined && overallTagsRef.current === undefined) {                  // currentTags defined, overallTags undefined
            if (!currentTagsRef.current.includes(new_tag)) {
                const newList = currentTagsRef.current.concat([new_tag])
                setCurrentTags(newList)
            }
        } else if (currentTagsRef.current === undefined && overallTagsRef.current !== undefined) {                  // currentTags undefined, overallTags defined
            if (!overallTagsRef.current.includes(new_tag)) {
                const newList = [new_tag]
                setCurrentTags(newList)
            }
        } else if (currentTagsRef.current === undefined && overallTagsRef.current === undefined) {                  // both arrays are undefined
            const newList = [new_tag]
            setCurrentTags(newList)
        }
    }

    const removeTagOnCurrent = (removed_tag: string) => {
        console.log(`REMOVING TAG FROM CURRENT IMAGE.`)
        if (currentTagsRef.current) {
            const newList = currentTagsRef.current.filter(tag => tag !== removed_tag)
            setCurrentTags(newList)
        }
    }

    const addDescriptionOnCurrent = (new_description: string) => {
        console.log(`ADDING DESCRIPTION TO CURRENT IMAGE.`)
        setCurrentDescriptions(new_description)
    }

    const removeDescriptionOnCurrent = () => {
        console.log(`REMOVING DESCRIPTION FROM CURRENT IMAGE.`)
        setCurrentDescriptions('')
    }


    /******************************/
    /*** OVERALL DRAWER EDITERS ***/
    /******************************/
    const addTagForAll = (new_tag: string) => {
        console.log(`ADDING TAG TO ALL.`)
        // STEP 1: Add tag to overall tags
        if (overallTagsRef.current) {
            if (!overallTagsRef.current.includes(new_tag)) {
                const newList = overallTags.concat([new_tag])
                setOverallTags(newList)
            }
        } else {
            const newList = [new_tag]
            setOverallTags(newList)
        }

        // STEP 2: Remove new_tag from current tags (if it's there) and add it to overall tags
        if (currentTagsRef.current !== undefined) {
            if (currentTagsRef.current.includes(new_tag)) {
                const newList = currentTagsRef.current.filter(item => item !== new_tag)
                setCurrentTags(newList)
            }
        }
    } 

    const addDescriptionForAll = (added_description: string) => {
        if (!permissionToReplaceAll) {
            setShowWarningPopup('Are you sure you want to add a new default description to this batch? This description will replace all the existing descriptions you have added. This is a big move.')
        } else {
            setOverallDescription(added_description)
        }
    }

    const removeTagForAll = (removed_tag: string) => {
        // remove from overallTags
        if (!permissionToDeleteAll) {
            setShowWarningPopup('Are you sure you want to delete this tag from ALL images in this batch? This tag will be deleted on all images in this batch. This is a big move.')
        } else {
            const newList = overallTags.filter(tag => tag !== removed_tag)
            setCurrentTags(newList)
        }
        setPermissionToDeleteAll(false)
    }  

    const removeDescriptionForAll = (removed_description: string) => {
        // filter out of overallDescription
        if (!permissionToDeleteAll) {
            setShowWarningPopup('Are you sure you want to delete this description from ALL images in this batch? This description will be deleted from all images in this batch which have it. This is a big move.')
        } else {
            setOverallDescription('')
        }
        setPermissionToDeleteAll(false)
    }

    /*************/
    /*** UTILS ***/
    /*************/
    const resetTagsOnCurrent = () => {
        setCurrentTags([])
    }

    const resetDescriptionOnCurrent = () => {
        setCurrentDescriptions('')
    }

    const resetTagsForAll = () => {
        setOverallTags([])
    }

    const resetDescriptionForAll = () => {
        setOverallDescription('')
    }


  return (
    <BatchUploadContext.Provider value={{
      overallTags: overallTags,
      currentTags: currentTags, 
      overallDescription: overallDescription,
      currentDescription: currentDescription,

      // On Current Image in package
      addTagOnCurrent: addTagOnCurrent,
      removeTagOnCurrent: removeTagOnCurrent,
      resetTagsOnCurrent: resetTagsOnCurrent,

      addDescriptionOnCurrent: addDescriptionOnCurrent,
      removeDescriptionOnCurrent: removeDescriptionOnCurrent,
      resetDescriptionOnCurrent: resetDescriptionOnCurrent,

      // For All Images in the package
      addTagForAll: addTagForAll,
      removeTagForAll: removeTagForAll,
      resetTagsForAll: resetTagsForAll,

      addDescriptionForAll: addDescriptionForAll,
      removeDescriptionForAll: removeDescriptionForAll,
      resetDescriptionForAll: resetDescriptionForAll,

      // utils
      setPermissionToDeleteAll: SetPermissionToDeleteAll,
      setPermissionToReplaceAll: SetPermissionToReplaceAll
    }}>
      {children}
    </BatchUploadContext.Provider>
  )
}

// Helper hook to access the provider values
const useBatchUploadContext = (): BatchUploadContextValue =>
  useContext(BatchUploadContext)

export { BatchUploadContextProvider, useBatchUploadContext, BatchUploadContextValue }
export default BatchUploadContextProvider