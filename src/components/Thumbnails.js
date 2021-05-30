import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

export const Thumbnails = ({ videoFile, setVideoFile }) => {
  const [videos, setVideos] = useState([])
  const [mousePosition, setMousePosition] = useState([0, 0])
  const API_URL = 'https://gist.githubusercontent.com/mohammedhammoud/cf7aca4c87462cd061d4f2b1184392a8/raw/ea14389e293b478bdbace627d776ba6f7d735f14/teliatestdata.json'

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((videoData) => {
        setVideos(videoData)
        setVideoFile(videoData[0].video)
      })
  }, [setVideoFile])

  const changeVideo = (video) => {
    if (videoFile !== video) {
      setVideoFile(video)
    }
  }

  const handleMouseMove = (e, id) => {
    const description = document.getElementById(`description${id}`);
    const descriptionEdges = description.getBoundingClientRect();
    if (((window.innerWidth - descriptionEdges.width) < e.clientX) && ((window.innerHeight - descriptionEdges.height) < e.clientY)) {
      setMousePosition([(e.clientX - descriptionEdges.width), (e.clientY - descriptionEdges.height)])
    } else if ((window.innerHeight - descriptionEdges.height) < e.clientY) {
      setMousePosition([e.clientX, (e.clientY - descriptionEdges.height)])
    } else if ((window.innerWidth - descriptionEdges.width) < e.clientX) {
      setMousePosition([(e.clientX - descriptionEdges.width), e.clientY])
    } else {
      setMousePosition([e.clientX, e.clientY])
    }
  }

  if (videos.length > 0) {
    return (
      <Container>
        {videos.map((video) => {
          return (
            <Poster
              key={video.id}
              onClick={() => changeVideo(video.video)}
              role="button"
              aria-label={video.title}
              tabIndex="0"
              onKeyDown={() => changeVideo(video.video)}
              onMouseEnter={(e) => handleMouseMove(e, video.id)}
              onMouseMove={(e) => handleMouseMove(e, video.id)}
              onMouseLeave={() => setMousePosition([0, 0])}>
              <Image src={video.image} alt="poster" />
              <Title>{video.name}</Title>
              <Description position={mousePosition} id={`description${video.id}`}>
                <p>{video.description}</p>
              </Description>
            </Poster>
          )
        })}
      </Container>
    )
  }
  return <p>Could not find videos</p>
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 960px;
  margin: 20px;
  @media (max-width: 768px) {
    box-sizing: border-box;
    padding: 0 2%;
    margin: 2%;
  };
`
const Description = styled.div`
  display: none;
  position: absolute;
  left: ${(props) => props.position[0]}px;
  top: ${(props) => props.position[1]}px;
  max-width: 400px;
  max-height: 100vh;
  padding: 0 20px;
  background-color: rgba(255,255,255,0.9);
  border-radius: 5px;
  z-index: 1;
  @media (max-width: 768px) {
    font-size: 10px;
    max-width: 50%;
  };
`
const Poster = styled.div`
  width: 23%;
  cursor: pointer;
  :hover ${Description}{
    display: block;
  }
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
