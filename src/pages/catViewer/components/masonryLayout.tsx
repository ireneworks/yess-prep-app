import styled from "styled-components";
import {
  LARGE_SCREEN_SIZE,
  SMALL_SCREEN_SIZE,
} from "../../../styles/screenSizes";
import useWindowDimension from "../../../hooks/useWindowDimension";
import { getColumnCount } from "../../../services/catViewer/getColumnCount";
import ContentItem from "./contentItem";
import { COLORS } from "../../../styles/colors";

interface Props {
  source: ImageItemType[];
}

export default function MasonryLayout({ source }: Props) {
  const { innerWidth } = useWindowDimension();

  const columns: ImageItemType[][] = source.reduce(
    (accumulator: ImageItemType[][], currentValue, index) => {
      const column = index % getColumnCount(innerWidth);
      if (!accumulator[column]) {
        accumulator.push([currentValue]);
      } else {
        accumulator[column].push(currentValue);
      }
      return accumulator;
    },
    []
  );

  return (
    <Container>
      {columns.map((column, index) => (
        <div key={index} className="masonry-grid-wrapper">
          {column.map(({ url }, index) => (
            <ContentItem key={index} imageUrl={url} />
          ))}
        </div>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;

  div.masonry-grid-wrapper {
    display: flex;
    flex: 1 1 33.3%;
    flex-direction: column;
    gap: 16px;
    background: ${COLORS.white};

    @media screen and (max-width: ${LARGE_SCREEN_SIZE}) {
      flex: 1 1 50%;
    }

    @media screen and (max-width: ${SMALL_SCREEN_SIZE}) {
      flex: 1 1 100%;
    }
  }
`;
