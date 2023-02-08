import { useEffect, useRef, useState } from "react";
import catImageApi from "../../api/catImageApi";
import { LARGE_SCREEN_SIZE, SMALL_SCREEN_SIZE } from "../../styles/screenSizes";
import Loader from "./components/loader";
import styled from "styled-components";
import MasonryLayout from "./components/masonryLayout";

export default function CatViewer() {
  const [imageData, setImageData] = useState<ImageItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const observerTargetRef = useRef<HTMLDivElement>(null);

  const intersectHandler = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      (async function () {
        const response = await catImageApi(30);
        setImageData((imageData) => imageData.concat(response));
        setIsLoading(false);
      })();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(intersectHandler, {
      threshold: 0.3,
    });
    if (observerTargetRef.current) {
      observer.observe(observerTargetRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <Container>
      <>
        {!isLoading && <MasonryLayout source={imageData} />}
        <div className="observe-box" ref={observerTargetRef}>
          <Loader />
        </div>
      </>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin-top: 24px;
  padding-bottom: 16px;

  div.observe-box {
    width: 100%;
    height: 30px;
    background: transparent;
  }

  @media screen and (max-width: ${LARGE_SCREEN_SIZE}) {
    margin: 24px;
  }

  @media screen and (max-width: ${SMALL_SCREEN_SIZE}) {
    margin: 16px;
  }
`;
