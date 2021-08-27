import React, { useEffect } from 'react'
import { BatchUploadButtons } from '../BatchUploadButtons'
import styles from './TagBA.module.css'

type TagBAProps = {
    currentTag?: string
    overallTag?: string
    onRemoveTag?: (removed_tag: string) => void,
    onRemoveTagForAll?: (removed_tag: string) => void,
}
  
export const TagBA = ({
    currentTag,
    overallTag,
    onRemoveTag,
    onRemoveTagForAll,
}: TagBAProps) => {

    // useEffect(() => {
    //     console.log(`[TAGBA] OVERALL TAG RENDERING... ${overallTag}`)
    // }, [overallTag])

return (
    <>
    {overallTag && (
        <div className={styles.wrapperMultiple}>
            {/* {console.log(`[TAG BA] Rendering overallTag = ${overallTag}`)} */}
            <span className={styles.tag}>{overallTag}</span>
            <BatchUploadButtons
                tag={overallTag}
                onRemoveTag={onRemoveTag}
                onRemoveTagForAll={onRemoveTagForAll}
            />
        </div>
    )}
    
    {currentTag && (
        <div className={styles.wrapperSingle}>
            {/* {console.log(`[TAG BA] Rendering currentTag ${currentTag}`)} */}
            <span className={styles.tag}>{currentTag}</span>
            <BatchUploadButtons
                tag={overallTag}
                onRemoveTag={onRemoveTag} 
            />
        </div>
    )}
    </>
)
}