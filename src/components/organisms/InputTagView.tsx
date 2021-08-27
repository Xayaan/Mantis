import React, { ReactElement, useEffect, useState } from 'react'

import InputTag from '../atoms/InputText/InputTag'
import { Tags } from '../molecules/Tags/Tags'
import styles from './InputTagView.module.css'
  
{/****************/}
{/**** UPLOAD ****/}
{/****************/}

type InputTagViewProps = {
  multipleImages: boolean
  tagList: string[]
  options: string[]
  searchFilter: (filter_text: string) => void
  profanityFilter?: (filter_text: string) => boolean
  onEnterTag?: (new_tag: string) => void
  onEnterTagWholeSet?: (new_tag: string) => void
  onRemoveTag: (removed_tag: string) => void
  onRemoveTagForAll?: (removed_tag: string) => void
}

export default function InputTagView({ 
  multipleImages, 
  tagList, 
  options,
  searchFilter,
  profanityFilter,
  onEnterTag,
  onEnterTagWholeSet, 
  onRemoveTag, 
  onRemoveTagForAll
}: InputTagViewProps): ReactElement {
  
  const [location, setLocation] = useState<'verification' | 'singlePhotoUpload' | 'batchUpload'>()

  useEffect(() => {
    if (multipleImages) {
      setLocation('batchUpload')
    } else {
      setLocation('singlePhotoUpload')
    }
  }, [multipleImages])

  return (
    <div>
      {multipleImages && location && (
        <div className={styles.tagViewMultipleImages}>
          <InputTag 
            name='tag'
            placeholder='Tag the whole set'
            size='default'
            options={options}
            addTag={onEnterTagWholeSet}
            searchFilter={searchFilter}
            profanityFilter={profanityFilter}
          />
          
          <InputTag
            name='tag'
            placeholder='Tag this image'
            size='default'
            options={options}
            addTag={onEnterTag}
            searchFilter={searchFilter}
            profanityFilter={profanityFilter}
          />
          
          {tagList && <Tags 
            location={location} 
            items={tagList}
            addTag={onEnterTag} 
            onRemoveTag={onRemoveTag} 
            onRemoveTagForAll={onRemoveTagForAll}
          />}
        </div>
      )}

      {!multipleImages && location && (
        <div className={styles.tagViewOneImage}>
          <InputTag
            name='tag'
            placeholder='Enter tag then press ENTER'
            size='default'
            options={options}
            addTag={onEnterTag}
            searchFilter={searchFilter}
            profanityFilter={profanityFilter}
          />

        {tagList && <Tags 
            location={location} 
            items={tagList} 
            addTag={onEnterTag}
            onRemoveTag={onRemoveTag}
          />
        }
        </div>
      )}
    </div>
  )
}
