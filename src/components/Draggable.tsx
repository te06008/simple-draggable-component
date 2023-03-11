import React, { ReactNode } from 'react';
import styled from 'styled-components';

function Draggable({
  children,
  areaRef,
  ...rest
}: {
  children: ReactNode;
  areaRef: React.RefObject<HTMLDivElement>;
}) {
  return <DraggableDiv ref={areaRef}>{children}</DraggableDiv>;
}
export default Draggable;

const DraggableDiv = styled.div`
  width: 50vw;
  height: 50vh;
  border: 1px solid black;
  position: relative;
`;
