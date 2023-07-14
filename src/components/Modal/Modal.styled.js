import { styled } from "styled-components";

export const ModalOverLay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;

  div {
    max-width: calc(100vw - 48px);
    max-height: calc(100vh - 60px);

    img {
      display: block;
      border-radius: 3px;
      max-height: 600px;
      max-width: 100%;
    }
  }
`;