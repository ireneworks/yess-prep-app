import { MouseEventHandler, useState } from "react";
import styled from "styled-components";

interface Props {
  imageUrl: string;
}

export default function ImageItem({ imageUrl }: Props) {
  const [isClicked, setIsClicked] = useState(false);
  const onClick: MouseEventHandler<HTMLImageElement> = () =>
    setIsClicked(!isClicked);

  return (
    <ImageWrapper isClicked={isClicked}>
      <img src={imageUrl} onClick={onClick} alt="Cat" />
    </ImageWrapper>
  );
}

const ImageWrapper = styled.div<{
  isClicked: boolean;
}>`
  position: relative;
  margin-bottom: 16px;
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
    transition: all 0.2s ease-in-out;
    transform: ${(props) => (props.isClicked ? "scale(2)" : "none")};
  }
`;
