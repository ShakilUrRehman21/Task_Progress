import React, { useState } from 'react';
import styled from 'styled-components';
import Survey from './Survey';

const AppContainer = styled.div`
  text-align: center;
  background-color: #b1e0e6;
  height: 100vh;
`;

const Title = styled.h1`
  color: #e64c30;
  background-color: white;
  font-size: 18px;
  padding:2%;
`;

const App = () => {
  return (
    <AppContainer>
      <Title>ARE YOU DISILLUSIONED?</Title>
      <Survey />
    </AppContainer>
  );
};

export default App;
