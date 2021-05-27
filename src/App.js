import React, { useState } from 'react'
import styled from 'styled-components'

import { Player } from './components/Player'
import { Thumbnails } from './components/Thumbnails'

const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const App = () => {
  const [videoFile, setVideoFile] = useState()
  return (
    <MainContainer>
      <Player videoFile={videoFile} />
      <Thumbnails videoFile={videoFile} setVideoFile={setVideoFile} />
    </MainContainer>
  );
};
