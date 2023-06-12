import React from 'react';

export const themes = {
  light: {
    color: "#000000",
    backgroundColor: "#d3d3d3"
  },
  dark: {
    color: "#ffffff",
    backgroundColor: "#595959"
  }
}

export const themeContext = React.createContext(themes.dark);

themeContext.displayName = "ThemeContext";
