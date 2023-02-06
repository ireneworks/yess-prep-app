import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navigation from "../navigation/navigation";

export default function Layout() {
  return (
    <>
      <Navigation />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
const Container = styled.main`
  display: flex;
  justify-content: center;
  margin-top: 72px;
  overflow-x: hidden;
`;
