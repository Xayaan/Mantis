import * as React from 'react'
import { useEffect } from 'react'

import { useBatchUploadDataContext } from '../../../../providers/PhotoUpload/BatchUpload/BatchUploadDataProvider'
import { useBatchUploadContext } from '../../../../providers/PhotoUpload/BatchUpload/BatchUploadProvider'
import InputTag from '../../../atoms/InputText/InputTag'
import { TagsBA } from '../../../molecules/Tags/BatchUpload/TagsBA'
import styles from './BatchUploadInputTagsView.module.css'

export type BatchUploadInputTagsViewProps = {
    searchFilter: (filter_text: string) => void
    profanityFilter: (filter_text: string) => boolean
    onEnterTag: (enter_tag: string) => void
    onEnterTagForAll: (enter_tag: string) => void
    onRemoveTag: (removed_tag: string) => void
    onRemoveTagForAll: (removed_tag: string) => void
}

export const BatchUploadInputTagsView = ({
    searchFilter,
    profanityFilter,
    onEnterTag,
    onEnterTagForAll,
    onRemoveTag,
    onRemoveTagForAll,
}: BatchUploadInputTagsViewProps) => {

    const { 
        currentBatchUploadIndex, 
        batchUploadImageRenderPackage 
    } = useBatchUploadDataContext()

    const {
        overallTags,
        currentTags
    } = useBatchUploadContext()
    

    // TS
    // useEffect(() => {
    //     console.log(`[TAGS VIEW] RENDER PACKAGE CHANGED`)
    // }, [batchUploadImageRenderPackage])

    // useEffect(() => {
    //     console.log(`[TAGS VIEW] OVERALL TAGS CHANGED`)
    // }, [overallTags])

    // useEffect(() => {
    //     console.log(`[TAGS VIEW] CURRENT TAGS CHANGED`)
    // }, [currentTags])

    useEffect(() => {
        console.log(`[TAGS VIEW] currentBatchUploadIndex changed`)
    }, [currentBatchUploadIndex])


    return (
            <div className={styles.wrapper}>

                {currentTags && 
                    <div className={styles.tagViewMultipleImages}>
                        
                        <InputTag 
                            name='tag'
                            placeholder='Tag the whole set'
                            size='default'
                            addTag={onEnterTagForAll}
                            searchFilter={searchFilter}
                            profanityFilter={profanityFilter}
                        />

                        <InputTag
                            name='tag'
                            placeholder='Tag this image'
                            size='default'
                            addTag={onEnterTag}
                            searchFilter={searchFilter}
                            profanityFilter={profanityFilter}
                        />
                        
                        {batchUploadImageRenderPackage[currentBatchUploadIndex] && 
                            <>
                            {batchUploadImageRenderPackage[currentBatchUploadIndex].tags && (
                                <TagsBA 
                                    currentTags={currentTags}
                                    overallTags={overallTags} 
                                    onRemoveTag={onRemoveTag} 
                                    onRemoveTagForAll={onRemoveTagForAll}
                                />
                            )}
                            </>
                        }
                    </div>
                }

            </div>
    )
}