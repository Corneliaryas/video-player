import React, { useState } from 'react'
import styled from 'styled-components'

import { PlayerCustomControls } from 'components/PlayerCustomControls';
import { Thumbnails } from './components/Thumbnails'

export const App = () => {
  const [videoFile, setVideoFile] = useState("")
  return (
    <MainContainer>
      <PlayerCustomControls videoFile={videoFile} />
      <Thumbnails videoFile={videoFile} setVideoFile={setVideoFile} />
    </MainContainer>
  );
};

const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 50px;
  @media (max-width: 768px) {
    margin: 0;
  };
`