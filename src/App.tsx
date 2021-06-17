import React from "react";
import theme from "commons/style/theme";
import GlobalStyle from "commons/style/GlobalStyle";
import { ThemeProvider } from "styled-components";

function App(): JSX.Element {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div>
          hi!
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
