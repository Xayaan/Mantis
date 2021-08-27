import { ImageRenderPackage } from "../../@types/Providers"
import { PostFile } from "./post"

type PostFilesResponse = {
    pkg: ImageRenderPackage[]
    allInvalid: boolean
}

export const PostFiles = (acceptedFiles: File[], accountId: string, accessToken: string): Promise<PostFilesResponse> => {
    return new Promise((resolve, reject) => {
        var trackRecord = 0
        var invalid = 0
        const batch: ImageRenderPackage[] = Array.from({ length: acceptedFiles.length } , () => ({
            photoId: '',
            imageUrl: '',
            tags: [],
            description: '',
            errors: []
        }))

        acceptedFiles.forEach((file, i) => {
            const currentPayload: ImageRenderPackage = batch[i]

            PostFile(file, accountId, accessToken).then(jsonResult => {
            
                // ts
                // console.log(`trying...`)
                // console.log(jsonResult)
                if (jsonResult["messages"] !== [] && jsonResult["messages"] !== undefined && jsonResult["message"] !== "File successfully uploaded") {
                    // console.log(`SETTING ERRORS TO ARRAY...`)
                    currentPayload.errors = jsonResult["messages"]
                    batch[i] = currentPayload
                    invalid++
                } else if (jsonResult["msg"] !== "" && jsonResult["msg"] !== undefined && jsonResult["message"] !== "File successfully uploaded") {
                    // console.log(`SETTING ERRORS TO "Could not post image."...`)
                    currentPayload.errors = [jsonResult["msg"]]
                    batch[i] = currentPayload
                    invalid++
                } else if (jsonResult["message"] !== "File successfully uploaded") {
                    currentPayload.errors = ["Could not post image."]
                    invalid++
                }
                else {
                    const fileurl = URL.createObjectURL(file)
                    currentPayload.photoId = jsonResult['id']
                    currentPayload.imageUrl = fileurl
                    batch[i] = currentPayload
                }
                
                trackRecord++

                if (trackRecord === acceptedFiles.length) {
                    const allInvalid = invalid === acceptedFiles.length
                    const res: PostFilesResponse = {
                        pkg: batch,
                        allInvalid: allInvalid
                    }
                    resolve(res)
                }

            }).catch((err: string) => {
                // ts
                // console.log(`catching...`)
                // console.log(`SETTING ERRORS TO ${err.toString()}`)

                trackRecord++
                invalid++ 

                currentPayload.errors = [err.toString()]
                batch[i] = currentPayload

                if (trackRecord === acceptedFiles.length) {
                    const allInvalid = invalid === acceptedFiles.length
                    const res: PostFilesResponse = {
                        pkg: batch,
                        allInvalid: allInvalid
                    }
                    resolve(res)
                }
            })
        })
    })
}