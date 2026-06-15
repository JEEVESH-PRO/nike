'use client'

import { createContext, useContext } from 'react'

const LenisContext = createContext({ lenis: null })

export function useLenis() {
  return useContext(LenisContext)
}

export default LenisContext
