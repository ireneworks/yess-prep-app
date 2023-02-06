import { useEffect, useState } from "react";
import CatImageApi from "../../api/catImageApi";
import styled from "styled-components";
import ImageItem from "./components/imageItem";
import Masonry from "react-masonry-css";
import { COLORS } from "../../styles/colors";
import {
  LARGE_SCREEN_SIZE,
  masonryGridBreakPoints,
  SMALL_SCREEN_SIZE,
} from "../../styles/screenSizes";
import InfiniteScroll from "react-infinite-scroll-component";

export default function CatViewer() {
  const [imageData, setImageData] = useState<ImageItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await CatImageApi(30);
    setImageData(imageData.concat(response));
  };

  useEffect(() => {
    (async function () {
      const response = await CatImageApi(30);
      setImageData(response);
      setIsLoading(!isLoading);
    })();
  }, [isLoading]);

  return (
    <Container>
      <InfiniteScroll
        dataLength={imageData.length}
        next={fetchData}
        hasMore={true}
        loader={
          <p>
            <span role="img" aria-label="cat">
              🐈
            </span>
            귀여운 고양이를 모으는 중이에요...
          </p>
        }
        pullDownToRefreshThreshold={30}
      >
        <Masonry
          className="masonry-grid"
          breakpointCols={masonryGridBreakPoints}
        >
          {!isLoading &&
            imageData.map(({ url }, index) => (
              <ImageItem key={index} imageUrl={url} />
            ))}
        </Masonry>
      </InfiniteScroll>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin-top: 24px;
  padding-bottom: 16px;

  p {
    margin-top: 120px;
    text-align: center;
    font-weight: 700;
    color: ${COLORS.gray7};
  }

  .masonry-grid {
    display: flex;
    gap: 16px;
    width: auto;
  }

  @media screen and (max-width: ${LARGE_SCREEN_SIZE}) {
    margin: 0 24px;
  }

  @media screen and (max-width: ${SMALL_SCREEN_SIZE}) {
    margin: 0 16px;
  }
`;
