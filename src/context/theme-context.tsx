import { useState, createContext, useEffect } from "react";

import {MuiThemeProvider, createTheme} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const COLORS = {
  'PURPLE': '#38015c',
  'DARK': '#212121',
  'WHITE': '#fff',
  'PINK': '#c291e2',
  'GREY': '#E0E0E0',
  'GREEN': '#129b8f',
}

const ThemeContext = createContext({
  theme: createTheme({
    palette: {
      background: {
        default: COLORS.WHITE
      },
      text: {
        primary: COLORS.DARK,
      },
      secondary: {
        main: COLORS.PURPLE,
        light: COLORS.GREY,
        dark: COLORS.DARK,
        contrastText: COLORS.PINK,
      }
    }
  }),
  onThemeChange: (theme: string) => {},
  mode: 'light',
});

const themeLight = createTheme({
  palette: {
    background: {
      default: COLORS.WHITE
    },
    text: {
      primary: COLORS.DARK
    },
    secondary: {
      main: COLORS.GREEN,
      light: COLORS.WHITE,
      dark: COLORS.GREY,
      contrastText: COLORS.PINK,
    }
  }
});

const themeDark = createTheme({
  palette: {
    background: {
      default: COLORS.DARK
    },
    text: {
      primary: COLORS.WHITE
    },
    secondary: {
      main: COLORS.GREY,
      light: COLORS.DARK,
      dark: COLORS.GREY,
      contrastText: COLORS.GREEN,
    }
  }
});

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = (props) => {
  const [theme, setTheme] = useState(themeLight);
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const theme = localStorage.getItem('theme')

    switch(theme) {
      case 'light':
        setTheme(themeLight);
        setMode('light');
        break;
      case 'dark':
        setTheme(themeDark);
        setMode('dark');
        break;
      default:
        setTheme(themeLight);
        setMode('light');
        break;
    }
  }, [])

  const changeTheme = (themeName: string): void => {
    switch(themeName) {
      case 'light':
        localStorage.setItem('theme', 'light')
        setTheme(themeLight);
        setMode('light');
        break;
      case 'dark':
        localStorage.setItem('theme', 'dark')
        setTheme(themeDark);
        setMode('dark');
        break;
      default:
        localStorage.setItem('theme', 'primary')
        setTheme(themeLight);
        setMode('light')
        break;
    }
  }

  const contextValue = {
    theme,
    mode,
    onThemeChange: changeTheme,
  }

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeContext.Provider value={contextValue}>
        <CssBaseline />
        {props.children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
}

interface ThemeContextProviderProps {}

export default ThemeContext;