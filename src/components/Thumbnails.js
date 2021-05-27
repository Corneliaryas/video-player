import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

// Style poster section
// Make responsive
const Container = styled.div`
  display: flex;
  flex-direction: row;
`

export const Thumbnails = ({ videoFile, setVideoFile }) => {
  const [videos, setVideos] = useState([])
  const API_URL = 'https://gist.githubusercontent.com/mohammedhammoud/cf7aca4c87462cd061d4f2b1184392a8/raw/ea14389e293b478bdbace627d776ba6f7d735f14/teliatestdata.json'

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((videos) => {
        setVideos(videos)
        setVideoFile(videos[0].video)
        console.log(videos)
      })
  }, [setVideoFile])

  const changeVideo = (video) => {
    if (videoFile !== video) {
      setVideoFile(video)
    }
  }

  if (videos.length > 0) {
    return (
      <Container>
        {videos.map((video) => {
          return (
          // On hover show video.description

            <div key={video.id} onClick={() => changeVideo(video.video)}>
              <img src={video.image} alt="poster" />
              <p>{video.name}</p>
            </div>
          )
        })}
      </Container>
    )
  }
  return <p>Could not find videos</p>
}