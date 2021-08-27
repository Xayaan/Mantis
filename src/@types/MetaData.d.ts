export type simpleTuple = {
  name: string,
  index: number
}

export type TimeState = {
  end_date: string,
  start_date: string
}

export type tuple = {
  id: string
  indicies: number[]
  count: number
}

export type Photo = {
  url: string
  photo_id: string
  tag_data: TagData
  description: string
  uploaded_at: number
  updated_at: number
}

export type TagData = {
  tags: string[]
  other: any
  uploaded_by: string
  created_at: number
  updated_at: number
}

// ++++++++++++++++++++++++++++++ //
// +++ OBJECT DETECTION BOXES +++ //
// ++++++++++++++++++++++++++++++ //

export type RectangleCoords = {
  x1: number,                           // top-left
  x2: number,                           // top-right
  x3: number,                           // bottom-right
  x4: number,                           // bottom-left
}

export type Polygon = {
}

// +++++++++++++++++++ //
// +++ AUTH TOKENS +++ //
// +++++++++++++++++++ //
export type Tokens = {
  accessToken: string
  refreshToken: string
}

export type NewTokens = {
  newAccessToken: string
  newRefreshToken: string
}

export type PostNonceRequest = {
  nonce: number
  message: string
  [key: string]: number | string
}

export interface SignResponse {
  accountId: string
  signed: string
  [key: string]: string
}
