'use client'

import Image, { type ImageProps } from 'next/image'
import { forwardRef } from 'react'

const ThemeImage = forwardRef<HTMLImageElement, ImageProps>(function ThemeImage(
  { alt = '', ...props },
  ref
) {
  return <Image ref={ref} alt={alt} {...props} />
})

export default ThemeImage
