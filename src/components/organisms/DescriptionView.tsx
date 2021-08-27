import React, { ReactElement } from 'react'

import InputDescription from '../atoms/InputText/InputDescription'
import Description from '../molecules/Description/Description'
import styles from './DescriptionView.module.css'

type DescriptionViewProps = {
  multipleImages: boolean
  description: string
  onEnterDescription?: (new_description: string) => void
  onRemoveDescription?: (removed_description: string) => void
  onEditDescription?: (edited_description: string) => void
}

export default function DescriptionView({ 
  multipleImages, 
  description,
  onEnterDescription,
  onRemoveDescription,
  onEditDescription
}: DescriptionViewProps): ReactElement {
    return (
      <div>
        <Description 
          description={description}
          onRemove={onRemoveDescription}
        />
        {multipleImages ? (
          <div className={styles.descriptionMultipleImages}>
            <InputDescription
              name='description'
              placeholder='Describe all images in this batch then press ENTER.'
              size='default'
              addDescription={onEnterDescription}
            />
            <InputDescription
              name='tag'
              placeholder='Describe the image currently shown then press ENTER.'
              size='default'
              addDescription={onEnterDescription}
            />
          </div>
        ) : (
            <div className={styles.descriptionOneImage}>
                <InputDescription
                  name='tag'
                  placeholder='Describe the image currently shown then press ENTER.'
                  size='default'
                  addDescription={onEnterDescription}
                />
            </div>
        )}
      </div>
    )
  }