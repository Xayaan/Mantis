import styles from './InputTagView.module.css'
import React, { ReactElement, useEffect, useState } from 'react'

import InputTag from '../../../atoms/InputText/InputTag'
import { Tags } from '../../../molecules/Tags/Tags'

type SingleImageInputTagsViewProps = {
  multipleImages: boolean
  tagList: string[]
  searchFilter: (filter_text: string) => void
  onEnterTag?: (new_tag: string) => void
  onRemoveTag: (removed_tag: string) => void
}

export default function SingleImageInputTagsView({ 
  multipleImages, 
  tagList,
  searchFilter,
  onEnterTag, 
  onRemoveTag, 
}: SingleImageInputTagsViewProps): ReactElement {
  
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
        <div className={styles.tagViewOneImage}>
            <InputTag
                name='tag'
                placeholder='Enter tag then press ENTER'
                size='default'
                addTag={onEnterTag}
                searchFilter={searchFilter}
            />

            {tagList && <Tags 
                location={location} 
                items={tagList} 
                onRemoveTag={onRemoveTag}
            />}
        </div>
    </div>
  )
}
