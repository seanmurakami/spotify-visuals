import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    green: "#1DB954",
    lightGreen: "#1bd85f",
    darkGreen: "#0d5728",
    black: "#191414",
    white: "#FFFFFF",
  },
};

const Theme = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export default Theme;
