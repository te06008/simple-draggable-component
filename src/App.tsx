import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Box from './components/Box';
import Draggable from './components/Draggable';
import useDraggable from './hooks/useDraggable';

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

function App() {
  const [
    areaRef,
    isShow,
    boxRef,
    boxInfo,
    setBoxInfo,
    boxPosition,
    onDragStart,
    onDrag,
    onDragOver,
    onDragEnd,
  ] = useDraggable();

  return (
    <Wrapper>
      <GlobalStyle />
      <Draggable areaRef={areaRef}>
        {isShow && (
          <Box
            boxRef={boxRef}
            boxInfo={boxInfo}
            setBoxInfo={setBoxInfo}
            boxPosition={boxPosition}
            onDragStart={onDragStart}
            onDrag={onDrag}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            height={30}
            width={100}
            text='Drag Me'
          />
        )}
      </Draggable>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
