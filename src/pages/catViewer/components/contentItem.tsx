import { MouseEventHandler, useMemo, useState } from "react";
import styled from "styled-components";
import useWindowDimension from "../../../hooks/useWindowDimension";

interface Props {
  imageUrl: string;
}

export default function ContentItem({ imageUrl }: Props) {
  const [contentWidth, setContentWidth] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const { innerWidth, innerHeight } = useWindowDimension();

  const onClick: MouseEventHandler<HTMLImageElement> = (event) => {
    setIsClicked(!isClicked);
    setContentWidth(event.currentTarget.getBoundingClientRect().width);
    setContentHeight(event.currentTarget.getBoundingClientRect().height);
  };

  const x = useMemo(() => {
    return innerWidth / 2 - (contentWidth * 2.5) / 2;
  }, [contentWidth, innerWidth]);

  const y = useMemo(() => {
    return innerHeight / 2 - (contentHeight * 2.5) / 2;
  }, [contentHeight, innerHeight]);

  return (
    <>
      <Content
        x={x}
        y={y}
        isClicked={isClicked}
        src={imageUrl}
        onClick={onClick}
        alt="Cat"
      />
      {isClicked && <div />}
    </>
  );
}

const Content = styled.img<{
  x: number;
  y: number;
  isClicked: boolean;
}>`
  position: relative;
  width: 100%;
  height: auto;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  transform-origin: top left;
  transform: ${(props) =>
    props.isClicked
      ? `translate(${props.x}px, ${props.y}px) scale(3)`
      : "unset"};
  z-index: ${(props) => (props.isClicked ? 100 : 1)};
  cursor: pointer;
`;
