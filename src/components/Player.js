import React from 'react'
import styled from 'styled-components'

const VideoPlayer = styled.video`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: contain; // "cover" if it should fill the player
  background-color: black;
 `
const VideoContainer = styled.div`
  width: 100%;
  max-width: 853px;

`

export const Player = ({ videoFile }) => {
  // Handle custom controls
  // Change video URL when videoFile changes
  return (
    <VideoContainer>
      <VideoPlayer controls key={videoFile}>
        <source src={videoFile} type="video/mp4" />
            Your browser does not support mp4
      </VideoPlayer>
    </VideoContainer>
  )
}