
export const PostFile = async(file: any, accountId: string, accessToken: string) => {
  const filedata = new FormData()
  const filepath = file.name

  filedata.append("file", file, filepath)
  filedata.append("uploaded_by", accountId)

  const imageHeaders = new Headers();
  imageHeaders.append("Authorization", `Bearer ${accessToken}`);

  const fileResponse = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/v1/upload-file`,
    {
      method: 'POST',
      body: filedata,
      headers: imageHeaders
    })

  const jsonResult = await fileResponse.json()

  // ts
  // console.log(`[photo.ts] PostFile jsonResult`)
  // console.log(jsonResult)

  return jsonResult
}



export const PostMetadata = async(accessToken: string, photoId: string, tags?: string[], description?: string) => {
  // const placeholder = returnOther(other)

  const fileMetadata = {
    image_id: photoId,
    description: description,
    tags: tags
  }

  const imageHeaders = new Headers()
  imageHeaders.append("Authorization", `Bearer ${accessToken}`)

  const photoMetadataResponse = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/v1/annotate`,
    {
      method: 'POST',
      body: JSON.stringify(fileMetadata),
      headers: imageHeaders
    }
  )

  const jsonResult = await photoMetadataResponse.json()
  
  // ts
  // console.log(`[photo.ts] PostMetadata jsonResult`)
  // console.log(jsonResult)

  return jsonResult
}



export const GetMetadataByTag = async(accessToken: string, status: string, tag: string) => {
  const data = {
    "status": status,
    "page": 1,
    "tag": tag
  }

  const imageHeaders = new Headers()
  imageHeaders.append("Authorization", `Bearer ${accessToken}`)
  imageHeaders.append("Content-Type", "application/json");

  const metadataByTagRequest = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/v1/search-images`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: imageHeaders
    }
  )

  const jsonResult = await metadataByTagRequest.json()
  
  // ts
  console.log(`[photo.ts] metadataByTag jsonResult`)
  console.log(jsonResult)
  
  return jsonResult
}
