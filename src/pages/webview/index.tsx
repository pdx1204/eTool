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

const WebviewWrapper = styled.div`
  height: 100vh;
  background-color: transparent;
  cursor: crosshair !important;
  user-select: none;
`;
