import React from 'react'
import shortid from 'shortid'

import { TagCheckboxes } from '../TagCheckboxes'
import { Tag } from './Tag'
import styles from './Tags.module.css'

export type CheckTags = {
  tag: string
  checked: boolean
}


type TagsProps = {
  location: 'verification' | 'singlePhotoUpload' | 'batchUpload'
  
  items?: string[] 
  itemsWithFlags?: CheckTags[]
  addedItems?: string[]

  className?: string
  addTag?: (new_tag: string) => void
  onRemoveTag?: (removed_tag: string) => void
  onRemoveTagForAll?: (removed_tag: string) => void
  onFlagTag?: (flagged_tag: string) => void
  onVerifyTag?: (verified_tag: string) => void
}

export const Tags = ({
  items,
  itemsWithFlags,
  addedItems,
  location,
  className,
  addTag,
  onRemoveTag,
  onRemoveTagForAll,
  onFlagTag,
  onVerifyTag
}: TagsProps) => {
  // ts
  // console.log(`[Tags.tsx] itemsWithFlags = `)
  // console.log(itemsWithFlags)
  
  // ts
  // console.log(`[Tags.tsx] items = `)
  // console.log(items)

  const tags = items && items.filter(tag => tag != undefined).slice(0, items.length)        // filter out empty array items, and restrict to `max`
  const classes = className ? `${styles.tags} ${className}` : styles.tags
  const tagsWithFlags = itemsWithFlags &&  itemsWithFlags.filter(tag => tag.tag != undefined).slice(0, itemsWithFlags.length) 
  
  // ts
  // console.log(`[Tags.tsx] addedItems = `)
  // console.log(addedItems)

  // ts
  // console.log(`[Tags.tsx] tagsWithFlags = `)
  // console.log(tagsWithFlags)

  return (
    <div className={classes}>
      {/***************************************************************************/}
      {/** VERIFICATION: tagsWithFlags variable is only relevant in Verification **/}
      {/***************************************************************************/}
      {tagsWithFlags && (
        <>
          {tagsWithFlags?.map((tag) =>
              <Tag
                tag={tag.tag}
                location={location}
                checked={tag.checked}
                onRemoveTag={onRemoveTag}
                onFlagTag={onFlagTag}
                onVerifyTag={onVerifyTag}
                key={shortid.generate()}
              />
          )}
        </>
      )}

      {/************************************************************************/}
      {/** VERIFICATION: addedItems variable is only relevant in Verification **/}
      {/************************************************************************/}
      {addedItems && (
        <>
          {addedItems.map((addedItem) => 
            <Tag
              addedTag={addedItem}
              location={location}
              onRemoveTag={onRemoveTag}
              onFlagTag={onFlagTag}
              onVerifyTag={onVerifyTag}
              key={shortid.generate()}
            /> 
          )}
        </>
      )}

      {/********************************************************************************/}
      {/** UPLOAD: tags variable is only relevant in SingleImageUpload or BatchUpload **/}
      {/********************************************************************************/}
      {tags && (
        <>
          {tags?.map((tag) => 
            <Tag
              tag={tag}
              location={location}
              onRemoveTag={onRemoveTag}
              onFlagTag={onFlagTag}
              onVerifyTag={onVerifyTag}
              key={shortid.generate()}
            /> 
          )}
        </>
      )}

      {location === 'singlePhotoUpload' && (
        <TagCheckboxes 
          location={location}
          added_tags={items}
          addTag={addTag}
          removeTag={onRemoveTag}
        />
      )}

    </div>
  )
}
