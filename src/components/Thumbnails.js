import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

// Style poster section
// Make responsive
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 853px;
  margin: 20px;
  @media (max-width: 768px) {
    box-sizing: border-box;
    padding: 0 2%;
    margin: 2%;

  };
  

`
const Poster = styled.div`
width: 23%;
`
const Image = styled.img`
  width: 100%;
`
const Title = styled.h2`
  text-align: center;
  margin: 5px;
  @media (max-width: 855px) {
    font-size: 15px;
  }
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

            <Poster key={video.id} onClick={() => changeVideo(video.video)}>
              <Image src={video.image} alt="poster" />
              <Title>{video.name}</Title>
            </Poster>
          )
        })}
      </Container>
    )
  }
  return <p>Could not find videos</p>
}