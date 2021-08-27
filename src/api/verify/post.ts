

type PostTagsOrDescriptionsRequest = {
  up_votes: string[]
  down_votes: string[]
}

type PostVerificationRequest = {
  tags: PostTagsOrDescriptionsRequest
  descriptions: PostTagsOrDescriptionsRequest
}

type PostAnnotationRequest = {
  tags: string[]
  description: string
}

export type PostVerificationImageRequest = {
  image_id: string
  verification: PostVerificationRequest
  annotation: PostAnnotationRequest
}

export type PostReportRequest = {
  [key: string]: string
}


export const PostVerification = async(accessToken: string, request: PostVerificationImageRequest) => {
    const imageHeaders = new Headers()
    imageHeaders.append("Authorization", `Bearer ${accessToken}`)

    // console.log(`BEGINNING POST VERIFICATION`)
    // console.log(`VERIFY.TS DATA`)
    // console.log(data)

    const verificationResponse = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/verify-image`, 
        {
          method: 'POST',
          body: JSON.stringify(request),
          headers: imageHeaders
        }
    )

    const jsonResult = await verificationResponse.json()
    // console.log(`=== POST VERIFICATION RESPONSE ===`)
    // console.log(jsonResult)
    return jsonResult
}


export const PostReport = async(accessToken: string, request: PostReportRequest) => {
    // sends one
    const data = {'photos': [request]}
    const imageHeaders = new Headers()

    imageHeaders.append("Authorization", `Bearer ${accessToken}`)

    const reportResponse = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/report-images`, 
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: imageHeaders
        }
    )

    const jsonResult = await reportResponse.json()
    // console.log(`=== POST REPORT RESPONSE ===`)
    // console.log(jsonResult)
    return jsonResult
}


export const QueryAllMetadata = async(accessToken: string, status: string, page: number, type?: string): Promise<any> => {

    const imageHeaders = new Headers()
    imageHeaders.append("Authorization", `Bearer ${accessToken}`)
    imageHeaders.append("Content-Type", "application/json");
  
    var parsedType = type ? type : ""
    
    const query = JSON.stringify({
      "status": status,
      "page": page,
      "fields": ["image_id", "tag_data", "descriptions"],
      "type": parsedType
    })
  
    const getUserMetadataRequest = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/query-metadata`,
      {
        method: 'POST',
        headers: imageHeaders,
        body: query
      }
    )
  
    const jsonResult = await getUserMetadataRequest.json()
  
    // ts
    // console.log(`[photo.ts] QueryUserMetadata jsonResult`)
    // console.log(jsonResult)
  
    return jsonResult
  }