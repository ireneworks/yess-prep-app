import styled from "styled-components";
import { COLORS } from "../../../styles/colors";

export default function Loader() {
  return (
    <Paragraph>
      <span role="img" aria-label="cat">
        🐈
      </span>
      귀여운 고양이를 모으는 중이에요...
    </Paragraph>
  );
}

const Paragraph = styled.p`
  margin-top: 120px;
  text-align: center;
  font-weight: 700;
  color: ${COLORS.gray7};
`;
