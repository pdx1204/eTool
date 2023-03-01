import styled, { createGlobalStyle } from "styled-components";

export default function Webview() {
  return (
    <WebviewWrapper>
      <GlobalStyle />
    </WebviewWrapper>
  );
}

const GlobalStyle = createGlobalStyle`
  :root {
    background-color: transparent;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      background-color: transparent;
    }
  }
`;

const WebviewWrapper = styled.canvas`
  width: 100%;
  height: 100vh;
  background-color: red;
  cursor: crosshair !important;
  user-select: none;
`;
