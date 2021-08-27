import React, { ReactElement } from 'react'

import { useAuthContext } from '../../providers/AuthProvider'

type CheckboxProps = {
  label: string
  location?: 'upload' | 'annotate' | 'verify'
}

export function Checkbox({ label, location }: CheckboxProps): ReactElement {
  const { acceptedUpload, setAcceptedUpload } = useAuthContext()

  // useEffect(() => {
  //   console.log(`Accepted Upload changed`)
  //   console.log(acceptedUpload)
  // }, [acceptedUpload])
    
  return (
    <div className="checkbox">
      <label>
        {acceptedUpload ? (
          <input
            disabled={true}
            type="checkbox"
            value={label}
            checked={true}
            onChange={() => setAcceptedUpload(false, false)}
          />
        ) : (
          <input
            disabled={false}
            type="checkbox"
            value={label}
            checked={false}
            onChange={() => setAcceptedUpload(true, true)}
          />
        )}
        {label}
      </label>
    </div>
  )
}