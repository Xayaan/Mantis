import { tuple } from '../@types/MetaData'
import { ImageMetadataContainer, ImageRenderPackage, ImageUrlContainer } from '../@types/Providers'
import { checkExtension } from '../api/utils/photoUtils'

export const getPhotoIds = (images: ImageRenderPackage[]) => {
    const photoIds: string[] = []
    // ts
    // console.log(`PHOTOIDS IMAGES = `)
    // console.log(images)

    images.forEach(image => {
        photoIds.push(image.photoId)
    })

    return photoIds
}

export const getImageUrls = (images: ImageRenderPackage[]) => {
    const imageUrls: string[] = []

    images.forEach(image => {
        imageUrls.push(image.imageUrl)
    })

    return imageUrls
} 

export const getTagList = (images: ImageRenderPackage[]) => {
    const tagList: string[][] = []

    images.forEach(image => {
        tagList.push(image.tags)
    })

    return tagList
}

export const getDescriptions = (images: ImageRenderPackage[]) => {
    const descriptions: string[] = []

    images.forEach(image => {
        descriptions.push(image.description)
    })

    return descriptions
} 

export const getErrors = (images: ImageRenderPackage[]) => {
    const errors: string[][] = []
    
    images.forEach(image => {
        errors.push(image.errors) 
    })
    return errors
} 

export const unpackImageRenderPackage = (images: ImageRenderPackage[]) => {    
    const photoIds: string[] = getPhotoIds(images)
    const imageUrls: string[] = getImageUrls(images)
    const tagList: string[][] = getTagList(images)
    const descriptions: string[] = getDescriptions(images)
    const errors: string[][] = getErrors(images)

    return { photoIds, imageUrls, tagList, descriptions, errors }
}

// TODO
// Remove bandaids with Akshay.
// EVERYTHING BELOW THIS LINE IS A BANDAID, AND A BAD ONE.
const checkIfPhotoIdInObject = (photoId: string, imageMetadata: ImageMetadataContainer[]): boolean => {

    // O(n^2). Redesign API calls to solve this problem.
    var solution: boolean = false
    imageMetadata.forEach(image => {
        if (image.photoId === photoId) {
            solution = true
        }
    })
    
    return solution
}

const checkIfPhotoIdInIdCount = (photoId: string, bugList: tuple[]): number => {

    // O(n^2). Redesign API calls to solve this problem.
    var solution: number = undefined
    bugList.forEach((tuple, i) => {
        if (tuple.id === photoId) {
            solution = i
        }
    })
    
    return solution
}

const notInBugIndicies = (index: number, bugIndicies: number[]): boolean => {
    var solution: boolean = true
    bugIndicies.forEach(bugIndex => {
        if (bugIndex === index) {
            solution = false
        }
    })

    return solution
}

const createBugIds = (images: any[]): tuple[] => {
    const idCounts: tuple[] = []
    images.forEach((image, i) => {
        if (checkIfPhotoIdInIdCount(image.hash, idCounts)) {
            idCounts[checkIfPhotoIdInIdCount(image.hash, idCounts)].count += 1 
            idCounts[checkIfPhotoIdInIdCount(image.hash, idCounts)].indicies.push(i)
        } else {
            const newTuple = {
                id: image.hash,
                indicies: [i],
                count: 1
            }
            idCounts.push(newTuple)
        }
    })

    // ts
    // console.log(`[ImageRenderPackage] idCounts = `)
    // console.log(idCounts)

    return idCounts
}

const extractBugIndicies = (images: any[]) => {
    
    const idCounts: tuple[] = createBugIds(images)

    // refined bugIds
    const purgedIndicies: number[] = []
    idCounts.forEach((tuple, i) => {
        if (tuple.count > 1) {
            tuple.indicies.forEach(index => {
                purgedIndicies.push(index)
            })
        }
    })

    // ts
    // console.log(`[ImageRenderPackage] purgedIndicies = `)
    // console.log(purgedIndicies)

    return purgedIndicies
}

export const fillBlankMetadata = async(imageMetadata: ImageMetadataContainer[], imageUrls: ImageUrlContainer[]) => {
    // O(N^2). Redesign API calls to solve this problem.
    if (imageMetadata.length < imageUrls.length) {
        // console.log(`[imageRenderPackage.ts] imageMetadata.length = ${imageMetadata.length}, imageUrls.length = ${imageUrls.length}`)
        imageUrls.forEach((imageUrlContainer, i) => {
            if (!checkIfPhotoIdInObject(imageUrlContainer.photoId, imageMetadata)) {
                const temp: ImageMetadataContainer = {
                    photoId: imageUrlContainer.photoId, 
                    tags: undefined,
                    description: undefined
                }
                imageMetadata.splice(i, 0, temp)
            }
        })
    } else if (imageMetadata.length > imageUrls.length) {
        // console.log(`[imageRenderPackage.ts] FATAL ERROR: imageMetadata.length > imageUrls.length. \
        // imageMetadata.length = ${imageMetadata.length}, imageUrls.length = ${imageUrls.length}` )
    } else {
        // console.log(`[imageRenderPackage.ts] imageMetadata.length == imageUrls.length. \
        // ${imageMetadata.length} === ${imageUrls.length} No apparent problem here.`)

        // console.log(imageMetadata)
        // console.log(imageUrls)
    }

    // console.log(imageMetadata)
    // console.log(imageUrls)

    return imageMetadata
}

export const filterZip = async(images: any[]): Promise<any[]> => {
    // O(n^2). Complete bulk/upload-zip bug fixes to solve this.

    // ts
    // console.log(`[imageRenderPackage] filterZip images =`)
    // console.log(images)

    return new Promise((resolve, reject) => {
        const newImages: any[] = []
        images.forEach((image, i) => {

            // ts
            // console.log(`Filtering zip image ${i}`)
            
            if (checkExtension(image.filename) != 'zip') {                
                newImages.push(image)
            }
            if (i === images.length - 1) {
                resolve(newImages)
            }
        })
    })
}

export const filterBugIndicies = async(images: any[]): Promise<any> => {
    // ts
    // console.log(`[imageRenderPackage] filterBugIndicies images =`)
    // console.log(images)

    return new Promise((resolve, reject) => {
        const bugIndicies: number[] = extractBugIndicies(images)
        const newImages: any[] = []
        images.forEach((image, i) => {

            // ts
            // console.log(`Filtering bug indicies ${i}`)
            
            if (notInBugIndicies(i, bugIndicies)) {
                newImages.push(image)
            }

            if (i === images.length - 1) {
                resolve(newImages)
            }
        })
    })
}