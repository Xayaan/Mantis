import * as React from 'react'
import { useEffect, useState } from 'react'

import { useVerificationDataContext } from '../../../providers/Verify/VerificationDataProvider'
import InputTag from '../../atoms/InputText/InputTag'
import { TagCheckbox } from '../../atoms/TagCheckbox'
import { TagCheckboxes } from '../../molecules/TagCheckboxes'
import { CheckTags, Tags } from '../../molecules/Tags/Tags'
import styles from './VerifyTagsView.module.css'

export type VerifyTagsViewProps = {
    currentTags: string[]
    upvotedTags: string[]
    downvotedTags: string[]
    setUpvotedTags: (upvoted_tags: string[]) => void
    setDownvotedTags: (downvoted_tags: string[]) => void
}

export default function VerifyTagsView({
    currentTags,
    upvotedTags,
    downvotedTags,
    setUpvotedTags,
    setDownvotedTags
}: VerifyTagsViewProps) {

    const { 
        currentVerificationIndex,
        checkList,
        badWords,
        addedTags,
        addAddedTag,
        removeAddedTag
    } = useVerificationDataContext()

    const [tagsWithFlags, setCurrentTagsWithFlags] = useState<CheckTags[]>()
    const [options, setOptions] = useState<string[]>()


    // SETTERS
    useEffect(() => {
        InitializeTagsWithFlags()
    }, [currentTags])

    // TS
    // useEffect(() => {
    //     console.log(`CURRENT TAGS WITH FLAGS: `)
    //     console.log(tagsWithFlags)
    // }, [tagsWithFlags])


    const SetCurrentTagsWithFlags = (new_array: CheckTags[]) => {
        setCurrentTagsWithFlags(new_array)
    }


    // SETTER LOGIC
    const InitializeTagsWithFlags = () => {
        if (currentTags !== undefined) {
            if (currentTags.length > 0) { 
                // ts
                // console.log(`CURRENTTAGS IS NOT UNDEFINED`)
                const newTagsWithFlags: CheckTags[] = []
                currentTags.forEach((tag: string, i: number) => {
                    const item: CheckTags = {
                        tag: tag,
                        checked: undefined
                    }
                    newTagsWithFlags.push(item)
                    if (newTagsWithFlags.length === currentTags.length) {
                        setCurrentTagsWithFlags(newTagsWithFlags)
                    }
                }) 
            }
            else {
                setCurrentTagsWithFlags([])
            }
        }
    }

    const ChangeTagsWithFlags = (newVote: CheckTags) => {
        if (componentIsMounted && tagsWithFlags !== undefined) {
            const newTagsWithFlags: CheckTags[] = []
            tagsWithFlags.forEach((tagWithFlag: CheckTags, i: number) => {                
                if (tagWithFlag.tag === newVote.tag) {                    
                    newTagsWithFlags[i] = newVote
                } else {
                    newTagsWithFlags.push(tagsWithFlags[i])
                }

                if (newTagsWithFlags.length === tagsWithFlags.length) {
                    setCurrentTagsWithFlags(newTagsWithFlags)
                }
            })
        }
    }


    // change upvotedTags and downvotedTags when index changes
    useEffect(() => {
        setUpvotedTags([])
        setDownvotedTags([])
    }, [currentVerificationIndex])


    // FLAG AND VERIFY 
    const onFlagTag = (flagged_tag: string) => {
        if (componentIsMounted && tagsWithFlags !== undefined) {
            const newVote: CheckTags = {
                tag: flagged_tag,
                checked: false
            }
            if (!downvotedTags.includes(flagged_tag) && !upvotedTags.includes(flagged_tag)) {
                // console.log(`downvoting tag`)
                downvotedTags.push(flagged_tag)
                ChangeTagsWithFlags(newVote)

            }
            // remove from verifiedTags and add to downvotedTags 
            else if (upvotedTags.includes(flagged_tag)) {
                
                setUpvotedTags(upvotedTags.filter(item => item != flagged_tag))
                downvotedTags.push(flagged_tag)
                ChangeTagsWithFlags(newVote)
            
            }
            // reverse the downvote 
            else if (downvotedTags.includes(flagged_tag)) {
                console.log(`reversing downvote`)
                const newVote: CheckTags = {
                    tag: flagged_tag,
                    checked: undefined
                }
                setDownvotedTags(downvotedTags.filter(item => item != flagged_tag))
                ChangeTagsWithFlags(newVote)

            }
        } else {
            console.log(`Error flagging tag.`)
        }
    }


    const onVerifyTag = (verified_tag: string) => {
        if (componentIsMounted && tagsWithFlags !== undefined) {
            const newVote: CheckTags = {
                tag: verified_tag,
                checked: true
            }
            if (!upvotedTags.includes(verified_tag) && !downvotedTags.includes(verified_tag)) { 
                
                upvotedTags.push(verified_tag)
                ChangeTagsWithFlags(newVote)

            } else if (downvotedTags.includes(verified_tag)) {                                      // remove from downvotedTags and add to verifiedTags
                
                setDownvotedTags(downvotedTags.filter(item => item != verified_tag))
                upvotedTags.push(verified_tag)
                ChangeTagsWithFlags(newVote)
            
            } else if (upvotedTags.includes(verified_tag)) {                                        // reverse the upvote
                
                const newVote: CheckTags = {
                    tag: verified_tag,
                    checked: undefined
                }
                setUpvotedTags(upvotedTags.filter(item => item != verified_tag))
                ChangeTagsWithFlags(newVote)   

            }
        } else {
            console.log(`Error flagging tag.`)
        }
    }


    // FILTERS
    const searchFilter = (filter_text: string) => {
        if (checkList) {
          const filteredItems = filter_text === '' ? checkList : checkList.filter(
            (item: string) =>
              item.slice(0, filter_text.length).toLocaleLowerCase().includes(filter_text)
            )
          const shuffled = filteredItems.sort(() => 0.5 - Math.random());
          const selected = shuffled.slice(0, 10);
          
          setOptions(selected) // local
        }
    }
    
    const profanityFilter = (filter_text: string): boolean => {
        const filteredItems = badWords.filter((item: string) =>item.toLocaleLowerCase() === filter_text)

        if (filteredItems.length === 0) {
            return true
        } else {
            return false
        }
    }


    const componentIsMounted = React.useRef(true)
    useEffect(() => {
        return () => {
            componentIsMounted.current = false
        }
    }, [])

    
    return (
        <>
            <InputTag 
                options={options}
                addAddedTag={addAddedTag}
                existingTags={currentTags}
                searchFilter={searchFilter}
                profanityFilter={profanityFilter}
                location={"verification"}
                name={"Add Tag Verify"}
                placeholder={"Enter more relevant tags, then press ENTER. Avoid repetition or you could be penalized."}
            />


            {tagsWithFlags && (
                <>
                {tagsWithFlags.length !== 0 || addedTags.length !== 0 ? (
                    <>
                    <div className={styles.Padding}>
                    <h4 className={styles.verifyInstruction}>Please verify these tags: </h4>
                        <Tags
                            location={'verification'}
                            itemsWithFlags={tagsWithFlags} 
                            addedItems={addedTags}
                            onFlagTag={onFlagTag}
                            onVerifyTag={onVerifyTag}
                            onRemoveTag={removeAddedTag}
                        />
                    </div>
                    </>
                ) : (
                    <div className={styles.LightPadding}>
                        <p className={styles.paragraphPadding}>No tags on this image yet. Please add some.</p>
                    </div>
                )}
                </>
            )}

            <TagCheckboxes 
                location={'verification'}
                existing_tags={currentTags}
                added_tags={addedTags}
                addTag={addAddedTag}
                removeTag={removeAddedTag}
            />
        </>
    )
}