import { useEffect, useRef, useState } from 'react';
import { AreaInterface, BoxInfoInterface, Position } from '../types';

const initialPosition: Position = {
  x: 0,
  y: 0,
};

function useDraggable() {
  const areaRef = useRef<HTMLDivElement>(null);
  const [areaInfo, setAreaInfo] = useState<AreaInterface>({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });
  const [isShow, setIsShow] = useState<boolean>(false);

  const boxRef = useRef<HTMLDivElement>(null);
  const [boxInfo, setBoxInfo] = useState<BoxInfoInterface>({
    width: 0,
    height: 0,
  });
  const [beforePosition, setBeforePosition] =
    useState<Position>(initialPosition);
  const [boxPosition, setBoxPosition] = useState<Position>(initialPosition);

  // 영역 컴포넌트의 위치 계산
  useEffect(() => {
    if (areaRef.current) {
      const areaRect = areaRef.current.getBoundingClientRect();
      setAreaInfo({
        top: areaRect.top,
        right: areaRect.width,
        bottom: areaRect.height,
        left: areaRect.left,
      });
      setIsShow(true);
    }
  }, []);

  // 영역 내부에 있는지 확인
  const isInsideArea = (boxInfo: AreaInterface): boolean => {
    if (boxInfo.top < 0) {
      return false;
    }
    if (boxInfo.bottom > areaInfo.bottom) {
      return false;
    }
    if (boxInfo.left < 0) {
      return false;
    }
    if (boxInfo.right > areaInfo.right) {
      return false;
    }
    return true;
  };

  // 드래그 시작
  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    //+아이콘 제거
    e.dataTransfer.effectAllowed = 'move';

    //잔상 제거
    const blankCanvas = document.createElement('canvas');
    blankCanvas.classList.add('canvas');
    e.dataTransfer.setDragImage(blankCanvas, 0, 0);
    document.body.appendChild(blankCanvas);

    //스크롤 생성 방지
    document.body.style.overflow = 'hidden';

    setBeforePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  // 드래그 중
  const onDrag = (e: React.DragEvent<HTMLDivElement>) => {
    const diffX = e.clientX - beforePosition.x;
    const diffY = e.clientY - beforePosition.y;
    setBeforePosition({
      x: e.clientX,
      y: e.clientY,
    });

    const boxTop = boxPosition.y + diffY;
    const boxLeft = boxPosition.x + diffX;

    // 박스의 위치 계산
    const nextBoxInfo = {
      top: boxTop,
      right: boxLeft + boxInfo.width,
      bottom: boxTop + boxInfo.height,
      left: boxLeft,
    };

    //영역 밖의 드래그시 움직이지 못하게
    if (!isInsideArea(nextBoxInfo)) {
      return;
    }

    setBoxPosition({
      x: boxLeft,
      y: boxTop,
    });
  };

  //마우스가 대상을 잡고있을때
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  //드래그 끝났을 때
  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    //canvas 제거
    const canvases = document.getElementsByClassName('canvas');
    for (let i = 0; i < canvases.length; i++) {
      let canvas = canvases[i];
      canvas.parentNode?.removeChild(canvas);
    }
    //스크롤 방지 제거
    document.body.style.overflow = 'unset';
  };

  return [
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
  ] as [
    typeof areaRef,
    typeof isShow,
    typeof boxRef,
    typeof boxInfo,
    typeof setBoxInfo,
    typeof boxPosition,
    typeof onDragStart,
    typeof onDrag,
    typeof onDragOver,
    typeof onDragEnd,
  ];
}

export default useDraggable;
