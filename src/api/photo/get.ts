import axios from 'axios'
import rateLimit from 'axios-rate-limit';

const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 1000, maxRPS: 2 })

// const getPhotoById = (photoId: string, accessToken: string) => {
//   return http.get(
//     `${process.env.REACT_APP_BACKEND_URL}/api/v1/get-image-by-id?id=${photoId}`, 
//     { headers: {'Authorization': `Bearer ${accessToken}`},
//   })
// }

const getAllImages = (status: string, page: number, accessToken: string) => {
  return http.get(
    `${process.env.REACT_APP_BACKEND_URL}/api/v1/query-images?status=${status}&page=${page}`, 
    { headers: {'Authorization': `Bearer ${accessToken}`},
  })
}


export const GetPhotoById = async(accessToken: string, photoId: string) => {

  const imageHeaders = new Headers()
  imageHeaders.append("Authorization", `Bearer ${accessToken}`)

  const photoWithMetadataRequest = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/v1/get-image-by-id?id=${photoId}`,
    {
      method: 'GET',
      headers: imageHeaders
    }
  )

  const blobResult = await photoWithMetadataRequest.blob()

  // ts
  // console.log(`[photo.ts] GetPhotoById blobResult`)
  // console.log(blobResult)

  return blobResult
}

export const GetAllImages = async(accessToken: string, status: string, page: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    getAllImages(status, page, accessToken).then(res => {
      resolve(res)
    }).catch(err => reject(err))
  })
}