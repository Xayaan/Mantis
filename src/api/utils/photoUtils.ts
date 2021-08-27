export const returnOther = (other: any) => {
  if (other) {
    return other
  } else {
    return ""
  }
}

export const checkExtension = (filename: string) => {
  return filename.split('.').pop();
}