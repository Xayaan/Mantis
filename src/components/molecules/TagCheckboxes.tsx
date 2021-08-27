import React from "react"

import { TagCheckbox } from "../atoms/TagCheckbox"
import styles from './TagCheckboxes.module.css'

type TagsCheckboxesProps = {
    location: 'verification' | 'singlePhotoUpload'
    added_tags: string[]
    existing_tags?: string[]
    addTag: (new_tag: string) => void
    removeTag: (removed_tag: string) => void
} 

export const TagCheckboxes = ({
    location,
    added_tags,
    existing_tags,
    addTag,
    removeTag,
}: TagsCheckboxesProps) => {
    
    return (
    <>
         <div className={styles.pii}>
            <>
            <TagCheckbox
              location={location}
              added_tags={added_tags}
              existing_tags={existing_tags}
              label={"This image contains biometric information."}
              addTag={addTag}
              removeTag={removeTag}
              special_tag="biometric"
            />

            <TagCheckbox
              location={location}
              added_tags={added_tags}
              existing_tags={existing_tags}
              label={"This image contains PII of faces."}
              addTag={addTag}
              removeTag={removeTag}
              special_tag="PII - faces"
            />

            <TagCheckbox
              location={location}
              added_tags={added_tags}
              existing_tags={existing_tags}
              label={"This image contains PII of non-faces."}
              addTag={addTag}
              removeTag={removeTag}
              special_tag="PII - non faces"
            />

            <TagCheckbox
              location={location}
              added_tags={added_tags}
              existing_tags={existing_tags}
              label={"Copyright"}
              addTag={addTag}
              removeTag={removeTag}
              special_tag="Copyright"
            />
            </>
        </div>

        <div className={styles.bounties}>
          <>
          {/**********/}
          {/* LINE 1 */}
          {/**********/}
          <TagCheckbox
            location={location}
            existing_tags={existing_tags}
            added_tags={added_tags}
            label={"Anonymization Bounty (photos of faces)"}
            addTag={addTag}
            removeTag={removeTag}
            special_tag="anonymization bounty"
          />

          <TagCheckbox
            location={location}
            added_tags={added_tags}
            existing_tags={existing_tags}
            label={"Traffic Sign Bounty"}
            addTag={addTag}
            removeTag={removeTag}
            special_tag="traffic sign bounty"
          />

          <TagCheckbox
            location={location}
            added_tags={added_tags}
            existing_tags={existing_tags}
            label={"Food Bounty"}
            addTag={addTag}
            removeTag={removeTag}
            special_tag="food bounty"
          />

          <TagCheckbox
            location={location}
            added_tags={added_tags}
            existing_tags={existing_tags}
            label={"project.bb bounty (cigarette butts on the beach)"}
            addTag={addTag}
            removeTag={removeTag}
            special_tag="project.bb bounty"
          />
          </>
        </div>
        <div className={styles.bounties}>
          {/**********/}
          {/* LINE 2 */}
          {/**********/}
          <TagCheckbox
            location={location}
            existing_tags={existing_tags}
            added_tags={added_tags}
            label={"NFT Bounty (photos of NFTs)"}
            addTag={addTag}
            removeTag={removeTag}
            special_tag="nft+art bounty"
          />

          <TagCheckbox
            location={location}
            added_tags={added_tags}
            existing_tags={existing_tags}
            label={"OCR Bounty (photos with text in them)"}
            addTag={addTag}
            removeTag={removeTag}
            special_tag="ocr bounty"
          />

          <TagCheckbox
            location={location}
            added_tags={added_tags}
            existing_tags={existing_tags}
            label={"Meme Bounty"}
            addTag={addTag}
            removeTag={removeTag}
            special_tag="meme bounty"
          />

          <TagCheckbox
            location={location}
            added_tags={added_tags}
            existing_tags={existing_tags}
            label={"Product Bounty (photos of products)"}
            addTag={addTag}
            removeTag={removeTag}
            special_tag="product bounty"
          />
        </div>
    </>
    )
}