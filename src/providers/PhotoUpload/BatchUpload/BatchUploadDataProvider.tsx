import { ImageRenderPackage } from '../../../@types/Providers'
import { resolve } from 'path'
import React, { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from 'react'

interface BatchUploadDataContextValue {
    // State data
    batchUploadImageRenderPackage: ImageRenderPackage[]                                                  // the data that is scrolled through and eventually submitted. gets changed during the process of tagging & describing.
    currentBatchUploadIndex: number                                                                      // used to scroll through images and index changes to each image

    // ImageDrawer utils 
    setCurrentBatchUploadIndex: (new_index: number) => void                                              // used to scroll through images and index changes to each image.
    
    // UI utils
    setBatchUploadRenderPackage: (pkg: ImageRenderPackage[], changedIndex?: number) => void              // Used in PhotoUpload.tsx when the UI is first called.
    clearBatchUploadRenderPackage: () => void                                                            // Used in PhotoUpload.tsx after images are cleared.
    clearBatchUploadIndex: () => void                                                                    // Used in PhotoUpload.tsx after images are cleared
    updateImageRenderPackageTags: (by: 'overall' | 'current', data: string[]) => void                    // Used in BatchUploadProvider
    updateImageRenderPackageDescriptions: (by: 'overall' | 'current', data: string) => void,             // Used in BatchUploadProvider
}

const defaultState: BatchUploadDataContextValue = {
    // State data
    batchUploadImageRenderPackage: [],
    currentBatchUploadIndex: undefined,

    // ImageDrawer utils 
    setCurrentBatchUploadIndex: (new_index: number) => {},
    
    // UI utils
    setBatchUploadRenderPackage: (pkg: ImageRenderPackage[], changedIndex: number) => {},
    clearBatchUploadRenderPackage: () => {},
    clearBatchUploadIndex: () => {},
    updateImageRenderPackageTags: (by: 'overall' | 'current', data: string[]) => {},
    updateImageRenderPackageDescriptions: (by: 'overall' | 'current', data: string) => {},
}

const BatchUploadDataContext = createContext(defaultState)

function BatchUploadDataContextProvider({children}: {children: ReactNode}): ReactElement {

    const [batchUploadImageRenderPackage, setImageRenderPackage] = useState<ImageRenderPackage[]>([])
    const [currentBatchUploadIndex, setCurrentBatchUploadIndex] = useState<number>(0)

    /*************************/
    /*** IMAGEDRAWER UTILS ***/
    /*************************/
    const SetCurrentBatchUploadIndex = (index: number) => {
        setCurrentBatchUploadIndex(index)
    }
    
    /****************/
    /*** UI UTILS ***/
    /****************/

    // TS
    // useEffect(() => {
    //     console.log(`BATCH UPLOAD IMAGE RENDER PACKAGE CHANGED`)
    //     console.log(batchUploadImageRenderPackage)
    // }, [batchUploadImageRenderPackage])


    const ClearBatchUploadRenderPackage = () => {
        setImageRenderPackage([])
    }

    const ClearBatchUploadIndex = () => {
        setCurrentBatchUploadIndex(0)
    }

    const SetImageRenderPackage = (pkg: ImageRenderPackage[], changedIndex?: number) => {
        // ts
        // console.log(`CALLING SET IMAGE RENDER PACKAGE ON... `) 
        // console.log(pkg)
        // console.log(`... AT INDEX ${changedIndex}`)
        setImageRenderPackage(pkg)
    }

    /***************/
    /*** UPDATER ***/
    /***************/

    // Updates the ImageRenderPackage with changes. Called in the regular BatchUploadProvider.
    const UpdateImageRenderPackageTags = (by: 'overall' | 'current', data: string[]) => {
        // console.log(`UPDATING IMAGE RENDER PACKAGE...`)
        if (batchUploadImageRenderPackage) {
            if (by === 'overall') {
                // ts
                // console.log(`...by OVERALLTAGS...\ndata = `)
                // console.log(data)
                
                const newPkg = batchUploadImageRenderPackage
                newPkg.forEach((imageRenderData: ImageRenderPackage, i: number) => {
                    imageRenderData.tags = data.concat(imageRenderData.tags.filter((item) => data.indexOf(item) < 0))
                    
                    // ts
                    // console.log(`JOINED LIST = `)
                    // console.log(imageRenderData.tags)
                    // console.log(`updated element: `)
                    // console.log(imageRenderData)
                    
                    newPkg[i] = imageRenderData
                    if (i === batchUploadImageRenderPackage.length - 1) {
                        // ts
                        // console.log(`NEW PKG = `)
                        // console.log(newPkg)

                        setImageRenderPackage(newPkg)
                    }
                })
            } else if (by === 'current') {
                // ts
                // console.log(`...by CURRENTTAGS... on index ${currentBatchUploadIndex}\ndata = `)
                // console.log(data)
                
                if (batchUploadImageRenderPackage[currentBatchUploadIndex] !== undefined) {
                    const newPkg = batchUploadImageRenderPackage
                    newPkg[currentBatchUploadIndex].tags = data.concat(newPkg[currentBatchUploadIndex].tags.filter((item) => data.indexOf(item) < 0))
                     
                    // ts
                    // console.log(`JOINED LIST = `)
                    // console.log(newPkg[currentBatchUploadIndex].tags)
                    // console.log(`updated element: `)
                    // console.log(newPkg[currentBatchUploadIndex])

                    setImageRenderPackage(newPkg)
                }
            } 
        }
    }

    const UpdateImageRenderPackageDescriptions = (by: 'overall' | 'current', data: string) => {
        if (batchUploadImageRenderPackage) {
            if (by === 'current') {
                // ts
                // console.log(`...by CURRENTDESCRIPTION...\ndata = `)
                // console.log(data)
                if (batchUploadImageRenderPackage[currentBatchUploadIndex] !== undefined) {
                    batchUploadImageRenderPackage[currentBatchUploadIndex].description = data
                }
            } else if (by === 'overall') {
                // ts
                // console.log(`...by OVERALLDESCRIPTION...\ndata = `)
                // console.log(data)
                batchUploadImageRenderPackage.forEach((imageRenderData: ImageRenderPackage) => {
                    imageRenderData.description = data 
                })
            }
        }
    }

    return (
        <BatchUploadDataContext.Provider value={{
            // State data
            batchUploadImageRenderPackage: batchUploadImageRenderPackage,
            currentBatchUploadIndex: currentBatchUploadIndex,

            // ImageDrawer utils
            setCurrentBatchUploadIndex: SetCurrentBatchUploadIndex,

            // UI utils
            setBatchUploadRenderPackage: SetImageRenderPackage,
            clearBatchUploadRenderPackage: ClearBatchUploadRenderPackage,
            clearBatchUploadIndex: ClearBatchUploadIndex,
            updateImageRenderPackageTags: UpdateImageRenderPackageTags,
            updateImageRenderPackageDescriptions: UpdateImageRenderPackageDescriptions
        }}>
            {children}
        </BatchUploadDataContext.Provider>
    )
}

const useBatchUploadDataContext = (): BatchUploadDataContextValue =>
  useContext(BatchUploadDataContext)

export { BatchUploadDataContextProvider, useBatchUploadDataContext, BatchUploadDataContextValue }
export default BatchUploadDataContextProvider