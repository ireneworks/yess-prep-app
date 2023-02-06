import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../styles/colors";

export default function Navigation() {
  const navigate = useNavigate();
  return (
    <Container>
      <ul>
        <li>
          <button onClick={() => navigate("/cat-viewer")}>CatViewer</button>
        </li>
        <li>
          <button onClick={() => navigate("/working-hours")}>
            WorkingHours
          </button>
        </li>
      </ul>
    </Container>
  );
}

const Container = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 16px 40px;
  border-bottom: 1px solid ${COLORS.gray2};
  box-sizing: border-box;
  background: ${COLORS.white};
  z-index: 50;

  ul {
    display: flex;
    gap: 28px;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      button {
        padding: 10px 12px;
        border: none;
        background: ${COLORS.white};
        font-size: 16px;
        font-weight: 500;
        color: ${COLORS.gray8};
        cursor: pointer;

        &:hover {
          background: ${COLORS.gray1};
          border-radius: 4px;
        }
      }
    }
  }
`;
