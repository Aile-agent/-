"use client"

import Image, { type ImageProps } from "next/image"
import { useState, useEffect } from "react"

interface OptimizedImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  fallbackSrc?: string
}

export function OptimizedImage({ fallbackSrc, ...props }: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  // Reset error state if src changes
  useEffect(() => {
    setError(false)
  }, [props.src])

  return (
    <div className={`relative ${props.className || ""}`} style={{ height: props.height, width: props.width }}>
      <Image
        {...props}
        className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"} ${props.className || ""}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setError(true)
          setIsLoaded(true)
        }}
        src={error && fallbackSrc ? fallbackSrc : props.src}
        loading={props.priority ? undefined : "lazy"}
      />
    </div>
  )
}
