import React from 'react'
import styled from 'styled-components'

export const Player = ({ videoFile }) => {
  if(videoFile){
  const video = document.getElementById('video');
  video.addEventListener('error', () => {
    alert('Browser does not support video source');
  })}

  return (
    <VideoContainer>
      <VideoPlayer controls key={videoFile} id="video">
        <source src={videoFile} type="video/mp4" />
            Your browser does not support mp4
      </VideoPlayer>
    </VideoContainer>
  )
}

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 960px;
`
const VideoPlayer = styled.video`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: contain; // "cover" if it should fill the player
  background-color: black;
 `
