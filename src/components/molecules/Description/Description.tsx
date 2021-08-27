import React from 'react'
import { GoCheck } from 'react-icons/go'
import { IoIosBrush, IoMdClose, IoMdCloseCircle } from 'react-icons/io'

import styles from './Description.module.css'
import { DescriptionButton, DescriptionButtonAdd } from './DescriptionButtons'

type DescriptionTextContentProps = {
  location?: string
  description?: string
  addedDescription?: string
  descriptionChecked?: boolean
  onRemove?: (removed_description: string) => void
  onRemoveForAll?: (removed_description: string) => void
  onEdit?: (edited_description: string) => void
  onFlagDescription?: (flagged_description: string) => void
  onVerifyDescription?: (verified_description: string) => void
}

type DescriptionProps = {
  location?: string
  className?: string
  description?: string
  addedDescription?: string
  descriptionChecked?: boolean
  onRemove?: (removed_description: string) => void
  onRemoveForAll?: (removed_description: string) => void
  onEdit?: (edited_description: string) => void
  onFlagDescription?: (flagged_description: string) => void
  onVerifyDescription?: (verified_description: string) => void
}


const DescriptionTextContent = ({ 
  location, 
  description, 
  addedDescription, 
  descriptionChecked,
  onRemove, 
  onRemoveForAll,
  onEdit,
  onFlagDescription,
  onVerifyDescription
}: DescriptionTextContentProps) => {
  
  // console.log(`DESCRIPTION = ${description}`)
  // console.log(`ADDED DESCRIPTION = ${addedDescription}`)

  // console.log(`DESCRIPTION CHECKED = ${descriptionChecked}`)

  // console.log(`!description && !addedDescription = ${!description && !addedDescription}`)

  return (
    <>
      {/******************/}
      {/** VERIFICATION **/}
      {/******************/}
      {location === 'verification' ? (
        <>
          {description && (
            <div className={styles.descriptionVerify}>
              
              <div 
                // className={styles.descriptionDisplayWrapper}
              >
                <h4 className={styles.verifyInstruction}>Please verify this description:</h4>
                <p className={styles.verifyDescription}>{description}</p>
              </div>

              <div className={styles.descriptionVerifyButtonsWrapper}>
                <DescriptionButton 
                  onEvent={onFlagDescription}
                  type='flag'
                  icon={<IoMdClose className={styles.flagDescription} />}
                  description={description}
                  checked={descriptionChecked}
                />

                <DescriptionButton
                  onEvent={onVerifyDescription} 
                  type='verify'
                  icon={<GoCheck className={styles.removeDescription} />}
                  description={description}
                  checked={descriptionChecked}
                />
              </div>
           </div>
          )}

          {addedDescription && (
            <div className={styles.wrapperVerify}>

              <div className={styles.descriptionVerify}>
                <div 
                  // className={styles.descriptionDisplayWrapper}
                >
                  <h4 className={styles.verifyInstruction}>You wrote:</h4>
                  <p className={styles.verifyDescription}>{addedDescription}</p>
                </div>

                <div className={styles.descriptionVerifyButtonsWrapper}>
                  <DescriptionButtonAdd
                    onClick={onEdit}
                    icon={<IoIosBrush className={styles.editDescription} />}
                    description={addedDescription}
                  />

                  <DescriptionButtonAdd
                    onClick={onRemove} 
                    icon={<IoMdCloseCircle className={styles.removeDescription} />}
                    description={addedDescription}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/************/}
          {/** UPLOAD **/}
          {/************/}
          <div className={styles.wrapper}>
      
            <div className={styles.description}>
              {description}
            </div>

            {onEdit && (
              <DescriptionButtonAdd
                onClick={onEdit}
                icon={<IoIosBrush className={styles.editDescription} />}
                description={description}
              />
            )}

            {onRemove && (
              <DescriptionButtonAdd
                onClick={onRemove} 
                icon={<IoMdCloseCircle className={styles.removeDescription} />}
                description={description}
              />
            )}

            {onRemoveForAll && (
              <DescriptionButtonAdd
                onClick={onRemoveForAll} 
                icon={<IoMdCloseCircle className={styles.removeDescription} />}
                description={addedDescription}
              />
            )}

          </div>
        </>
      )}
    </>
  )
}

const Description: React.FC<DescriptionProps> = ({
  location,
  className,
  description, 
  addedDescription, 
  descriptionChecked,
  onRemove, 
  onEdit,
  onFlagDescription,
  onVerifyDescription
}) => {
  const classes = className ? `${styles.tags} ${className}` : styles.tags

  // const description = `TRIAL EXISTING DESCRIPTION.`

  // console.log(`DESCRIPTION = ${description}`)
  // console.log(`ADDED DESCRIPTION = ${addedDescription}`)

  // console.log(`DESCRIPTION CHECKED = ${descriptionChecked}`)

  return (
    <>
    { description || addedDescription ? (
      <div className={classes}>
        <DescriptionTextContent 
          location={location}
          description={description} 
          addedDescription={addedDescription}
          descriptionChecked={descriptionChecked}
          onRemove={onRemove} 
          onEdit={onEdit}
          onFlagDescription={onFlagDescription}
          onVerifyDescription={onVerifyDescription}
        />
      </div>
    ) : (
      <></>
    )}
    </>
  )
}

export default Description