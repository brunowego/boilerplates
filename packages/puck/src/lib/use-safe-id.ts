import React, { useState } from 'react'

import { generateId } from '@acme/id'

export const useSafeId = () => {
  if (typeof React.useId !== 'undefined') {
    return React.useId()
  }

  const [id] = useState(generateId())

  return id
}
