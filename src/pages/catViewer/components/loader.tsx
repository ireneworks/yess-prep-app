import styled from "styled-components";
import { COLORS } from "../../../styles/colors";

export default function Loader() {
  return (
    <Paragraph>
      <span role="img" aria-label="cat">
        π
      </span>
      κ·μ¬μ΄ κ³ μμ΄λ₯Ό λͺ¨μΌλ μ€μ΄μμ...
    </Paragraph>
  );
}

const Paragraph = styled.p`
  margin-top: 120px;
  text-align: center;
  font-weight: 700;
  color: ${COLORS.gray7};
`;
