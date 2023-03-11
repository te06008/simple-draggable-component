import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BoxInfoInterface, BoxInterface, Position } from '../types';

function Box({
  text,
  height,
  width,
  boxRef,
  boxInfo,
  setBoxInfo,
  boxPosition,
  onDragStart,
  onDrag,
  onDragOver,
  onDragEnd,
  ...rest
}: {
  text: string;
  height: number;
  width: number;
  boxRef: React.RefObject<HTMLDivElement>;
  boxInfo: BoxInfoInterface;
  setBoxInfo: React.Dispatch<React.SetStateAction<BoxInfoInterface>>;
  boxPosition: Position;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrag: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
}) {
  //Box 컴포넌트가 마운트 될때 박스 크기 계산
  useEffect(() => {
    if (boxRef.current) {
      const boxRect = boxRef.current.getBoundingClientRect();
      setBoxInfo({
        width: boxRect.width,
        height: boxRect.height,
      });
    }
  }, [boxRef, setBoxInfo]);

  return (
    <BoxDiv
      ref={boxRef}
      draggable
      height={height}
      width={width}
      left={boxPosition.x}
      top={boxPosition.y}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      {text}
    </BoxDiv>
  );
}

export default Box;

const BoxDiv = styled.div.attrs((props: BoxInterface) => ({
  style: {
    left: props.left + 'px',
    top: props.top + 'px',
  },
}))<BoxInterface>`
  background-color: blue;
  color: white;
  height: ${(p) => p.height + 'px'};
  width: ${(p) => p.width + 'px'};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`;
