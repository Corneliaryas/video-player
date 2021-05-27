import React from 'react'

export const Player = ({ videoFile }) => {
  // Handle custom controls
  // Change video URL when videoFile changes
  return (
    <div>
      <video controls key={videoFile}>
        <source src={videoFile} type="video/mp4" />
            Your browser does not support mp4
      </video>
    </div>
  )
}