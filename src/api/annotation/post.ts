export interface Annotation {
  type: string
  tag: string
  x: number
  y: number
  width: number
  height: number
}

export const PostAnnotation = async(accessToken: string, image_id: string, regions: Annotation[]) => {
  const annotationData: any = {
    "image_id": image_id,
    "annotations": regions
  }

  const annotationHeaders = new Headers();
  annotationHeaders.append("Authorization", `Bearer ${accessToken}`);

  const annotationResponse = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/api/v1/metadata/annotation`,
    {
      method: 'POST',
      body: JSON.stringify(annotationData),
      headers: annotationHeaders
    })

  const jsonResult = await annotationResponse.json()

  // ts
  // console.log(`[ANNOTATION] [post.ts] PostAnnotation jsonResult`)
  // console.log(jsonResult)

  return jsonResult
}