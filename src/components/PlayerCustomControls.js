import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import pause from '../assets/pause.svg'
import play from '../assets/play.svg'
import volume from '../assets/volume.svg'
import mute from '../assets/mute.svg'

export const PlayerCustomControls = ({ videoFile }) => {
  const [videoTime, setVideoTime] = useState('0')
  const [isPlaying, setIsPlaying] = useState(false)
  const [sliderValue, setSliderValue] = useState('0')
  const [isMuted, setIsMuted] = useState(false)
  const [videoDuration, setVideoDuration] = useState()
  let sliderInterval = useRef(null)
  let timeInterval = useRef(null)

  useEffect(() => {
    setVideoTime('0')
    setSliderValue('0')
    setIsPlaying(false)
    if (videoFile) {
      const video = document.getElementById('video')
      video.onloadedmetadata = () => {
        setVideoDuration(video.duration.toFixed(0))}
      video.pause();
      video.currentTime = 0;
    }
    return () => {
      clearInterval(timeInterval.current)
      clearInterval(sliderInterval.current)
    }
  }, [videoFile])

  const playPause = () => {
    const video = document.getElementById('video');
    if (isPlaying) {
      setSliderValue((video.currentTime / video.duration) * 100);
      video.pause();
      setIsPlaying(false);
    }
    if (!isPlaying) {
      if (sliderInterval.current) {
        clearInterval(sliderInterval.current)
      } if (timeInterval.current) {
        clearInterval(timeInterval.current)
      }
      video.play();
      setIsPlaying(true);
      sliderInterval.current = setInterval(() => setSliderValue((video.currentTime / video.duration) * 100), 250)
      if (video.currentTime < video.duration) {
        timeInterval.current = setInterval(() => setVideoTime(video.currentTime.toFixed()), 500)
      }
    }
  };

  // Slider values
  const timer = (e) => {
    const video = document.getElementById('video');
    video.currentTime = video.duration * (e / 100);
    setSliderValue(e);
  };

  const muteVideo = () => {
    const video = document.getElementById('video');
    if (isMuted) {
      video.muted = false;
      setIsMuted(false);
    }
    if (!isMuted) {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <VideoContainer>
      <VideoPlayer key={videoFile} id="video">
        <source src={videoFile} type="video/mp4" id="video-source" />
            Your browser does not support mp4
      </VideoPlayer>
      <CustomControls>
        <Button type="button" onClick={playPause}>
          <Icon src={isPlaying ? pause : play} alt={isPlaying ? 'Play' : 'Pause'} />
        </Button>
        <Slider
          type="range"
          value={sliderValue}
          onChange={(e) => timer(e.target.value)}
          gradient={sliderValue} />
        <p>0:{videoTime >= 10 ? videoTime : `0${videoTime}`} / 0:{videoDuration >= 10 ? videoDuration : `0${videoDuration}`}</p>
        <Button type="button" onClick={muteVideo}>
          <Icon src={isMuted ? mute : volume} alt="Mute/Unmute" />
        </Button>
      </CustomControls>
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
const CustomControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  color: white;
  z-index: 1;
`
const Slider = styled.input`
  width: 90%;
  -webkit-appearance: none;
  appearance: none;
  height: 2px;
  border-radius: 20px;
  background: linear-gradient(
    90deg,
    rgb(255, 0, 0) ${(props) => props.gradient}%,
    rgba(255, 255, 255, 0.5) ${(props) => props.gradient}%
  );
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    background-color: white;
    border-radius: 20px;
  }
`
const Icon = styled.img`
  width: 40px;
  height: 40px;
  background-color: transparent;
`
const Button = styled.button`
  background-color: transparent;
  border: none;
`