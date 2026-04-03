import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export default function MyDropzone({
  setImages,
  maxFiles = 5,
  multiple = true
}: {
  setImages: any

  maxFiles?: number,
  multiple?: boolean
}) {
  const onDrop = useCallback((acceptedFiles: any) => {
    const imageFiles = acceptedFiles.filter((file: any) =>
      file.type.startsWith('image/')
    )
    if (!multiple) {
      setImages(imageFiles[0])
      return
    } else {

      setImages((prev: any) => [...prev, ...imageFiles])
    }
  }, [setImages])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    maxFiles,
    multiple
  })

  return (
    <div
      {...getRootProps()}
      className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the images here...</p>
      ) : (
        <p>Drag & drop images here, or click to select</p>
      )}
    </div>
  )
}
