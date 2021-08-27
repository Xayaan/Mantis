import * as React from 'react'
import { useEffect, useState } from 'react'

import { useBatchUploadDataContext } from '../../../../providers/PhotoUpload/BatchUpload/BatchUploadDataProvider'
import InputDescription from '../../../atoms/InputText/InputDescription'
import Description from '../../../molecules/Description/Description'
import styles from './BatchUploadInputTagsView.module.css'

export type BatchUploadInputDescriptionViewProps = {
    // rendering: boolean
    profanityFilter?: (filter_text: string) => boolean

    onEnterDescription: (enter_tag: string) => void
    // onEnterDescriptionForAll: (enter_tag: string) => void
    onRemoveDescription: (removed_tag: string) => void
    onRemoveDescriptionForAll: (removed_tag: string) => void
}

export const BatchUploadInputDescriptionView = ({
    // rendering,
    profanityFilter,
    onEnterDescription,
    // onEnterDescriptionForAll,
    onRemoveDescription,
    onRemoveDescriptionForAll,
}: BatchUploadInputDescriptionViewProps) => {

    const [currentDescription, setCurrentDescription] = useState<string>()
    const { batchUploadImageRenderPackage, currentBatchUploadIndex } = useBatchUploadDataContext()

    useEffect(() => {
        if (currentBatchUploadIndex !== undefined && batchUploadImageRenderPackage !== undefined) {
            if (batchUploadImageRenderPackage[currentBatchUploadIndex] !== undefined) {
                setCurrentDescription(batchUploadImageRenderPackage[currentBatchUploadIndex].description) 
            }
        }
    }, [currentBatchUploadIndex, batchUploadImageRenderPackage])

    useEffect(() => {
        console.log(`[DESCRIPTION VIEW] === DESCRIPTION CHANGED ===`)
        console.log(currentDescription)
      }, [currentDescription])

    return (
        <>
            <div className={styles.wrapper}>

                {currentDescription !== undefined || currentDescription === '' && 
                    <div className={styles.tagViewMultipleImages}>
                        
                        {/* <InputDescription 
                            name='description'
                            placeholder='Describe the whole set'
                            size='default'
                            addDescription={onEnterDescriptionForAll}
                            profanityFilter={profanityFilter}
                        /> */}

                        
                        {currentDescription && (
                            <Description 
                                description={currentDescription}
                                onRemove={onRemoveDescription}
                                onRemoveForAll={onRemoveDescriptionForAll}
                            />
                        )}

                        <InputDescription
                            name='comment'
                            placeholder='Describe this image'
                            size='default'
                            addDescription={onEnterDescription}
                            profanityFilter={profanityFilter}
                        />
                        
                    </div>
                }

            </div>
        </>
    )
}