import React, { createContext, ReactElement, ReactNode, useContext, useEffect, useRef, useState } from 'react'

import { GetWords } from '../../../api/staticdata'
import Alert from '../../../components/atoms/Alert/Alert'

interface PhotoUploadContextValue {  
  tags: string[]
  description: string
  checkList: string[]
  badWords: string[]
  addTag: (new_tag: string) => void
  removeTag: (removed_tag: string) => void
  resetTags: () => void
  addDescription: (new_description: string) => void
  removeDescription: () => void
  resetDescription: () => void
}

const defaultState: PhotoUploadContextValue = {
  tags: [],
  description: "",
  checkList: [],
  badWords: [],
  addTag: (new_tag: string) => {},
  removeTag: (remove_tag: string) => {},
  resetTags: () => {},
  addDescription: (new_description: string) => {},
  removeDescription: () => {},
  resetDescription: () => {}
}

const PhotoUploadContext = createContext(defaultState)
const localStorageKey = "mantis-upload-provider"

function getLocalStorage(): PhotoUploadContextValue {
  const storageParsed =
    typeof window !== 'undefined' &&
    JSON.parse(window.localStorage.getItem(localStorageKey))
  // console.log(storageParsed)
  return storageParsed
}

function setLocalStorage(values: Partial<PhotoUploadContextValue>) {
  return (
    typeof window !== 'undefined' &&
    window.localStorage.setItem(localStorageKey, JSON.stringify(values))
  )
}

function PhotoUploadContextProvider({children}: {children: ReactNode}): ReactElement {
  const localStorage = getLocalStorage()
  const [tags, setTags] = useState<string[]>([])
  const [description, setDescription] = useState<string>('')
  const [checkList, setCheckList] = useState<string[]>()
  const [badWords, setBadWords] = useState<string[]>()
  const [isDouble, setIsDouble] = useState<boolean>(false)
  
  const tagsRef = useRef<string[]>()
  useEffect(() => {
    // setLocalStorage({tags, description})
    tagsRef.current = tags
  }, [tags, description])


  const SetCheckList = () => {
    GetWords('RECOMMENDED_WORDS').then(res => {
      setCheckList(res.data.result)
    })
    
  }

  const SetBadWords = () => {
    GetWords('BANNED_WORDS').then(res => {
      setBadWords(res.data.result)
    })
  }



  // TODO: Remove bandaid checklist. replace with real checklist from backend.
  useEffect(() => {
    if (!checkList) {
      SetCheckList()
    }
  }, [checkList])

  useEffect(() => {
    if (!badWords) {
      SetBadWords()
    }
  }, [badWords])

  const addTag = (new_tag: string) => {
    // create a toLowerCase list
    var tags_lower_case = []  
    for (var tag of tagsRef.current) {
      tags_lower_case.push(tag.toLowerCase())
    }

    // splits tag by commas
    var new_tag_stack = new_tag.split(',');
    new_tag_stack = [...new Set(new_tag_stack)]
    var buffer_tag_stack = new Array();
    for (var i = 0; i < new_tag_stack.length; i++) {
      // adds tag to buffer_tag_stack if it isn't in tagsRef.current
      if (!tags_lower_case.includes(new_tag_stack[i].trim().toLowerCase()) && new_tag_stack[i].trim() !== '') {
        buffer_tag_stack.push(new_tag_stack[i].trim());
      } else {
        setIsDouble(true)
        setInterval(function() { 
          setIsDouble(false)
        }, 5000)
      }
    }
    
    // console.log(`ADDTAG TRIGGERED`)
    if (tagsRef.current) {
      const newList = tagsRef.current.concat(buffer_tag_stack);
      setTags(newList)
    } else {
      const newList = [new_tag]
      setTags(newList)
    }
  }

  const removeTag = (removed_tag: string) => {
    if (removed_tag) {
      const newList = tags.filter(tag => tag !== removed_tag)
      setTags(newList)
    }
  }

  const resetTags = () => {
    const newList: string[] = []
    setTags(newList)
  }

  const addDescription = (new_description: string) => {
    setDescription(new_description)
  }
  
  const removeDescription = () => {
    setDescription('')
  }

  const resetDescription = () => {
    setDescription('')
  }

  return (
    <PhotoUploadContext.Provider value={{
      tags: tags, 
      description: description,
      checkList: checkList,
      badWords: badWords,
      addTag: addTag,
      removeTag: removeTag,
      resetTags: resetTags,
      addDescription: addDescription,
      removeDescription: removeDescription,
      resetDescription: resetDescription
    }}>
      {children}
      {isDouble && (
        <Alert text={"You have entered this tag already!"} state="guidelinesWarning" />
      )}
    </PhotoUploadContext.Provider>
  )
}

// Helper hook to access the provider values
const usePhotoUploadContext = (): PhotoUploadContextValue =>
  useContext(PhotoUploadContext)

export { PhotoUploadContextProvider, usePhotoUploadContext, PhotoUploadContextValue }
export default PhotoUploadContextProvider
