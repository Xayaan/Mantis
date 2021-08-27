import React, { useEffect } from 'react'
import shortid from 'shortid'
import { TagBA } from './TagBA'
import styles from './TagsBA.module.css'

type TagsBAProps = {
    currentTags?: string[] 
    overallTags?: string[]
  
    className?: string
    onRemoveTag?: (removed_tag: string) => void
    onRemoveTagForAll?: (removed_tag: string) => void
}
  
export const TagsBA = ({
    currentTags,
    overallTags,
    className,
    onRemoveTag,
    onRemoveTagForAll,
}: TagsBAProps) => {
    const classes = className ? `${styles.tags} ${className}` : styles.tags
  
    useEffect(() => {
        // ts
        // console.log(`[TAGSBA] current tags = `)
        // console.log(currentTags)
        // console.log(`[TAGSBA] overall tags = `)
        // console.log(overallTags)
    }, [currentTags, overallTags])

    return (
      <div className={classes}>
        {/********************************************************************************/}
        {/** UPLOAD: tags variable is only relevant in SingleImageUpload or BatchUpload **/}
        {/********************************************************************************/}
        {(currentTags || overallTags) && (
          <>
            {overallTags?.map((tag) => {
              return (
                <TagBA 
                    overallTag={tag}
                    onRemoveTag={onRemoveTag}
                    onRemoveTagForAll={onRemoveTagForAll}
                    key={shortid.generate()}
                />
              )
            })}

            {currentTags?.map((tag) => {
                return (
                <TagBA
                    currentTag={tag}
                    onRemoveTag={onRemoveTag}
                    key={shortid.generate()}
                  /> 
                )
            }
            )}
          </>
        )}
  
      </div>
    )
  }