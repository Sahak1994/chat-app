import React, {useContext, useState} from 'react';
import i18n from "i18next";
import { useTranslation } from "react-i18next";

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ThemeContext from 'context/theme-context';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';

import classes from './Navigation.module.css';

const languages = [
  {code: 'en', name: 'English', country_code: 'gb'},
  {code: 'ru', name: 'Russian', country_code: 'ru'},
]

type CodeType = 'en' | 'ru';

const MainNavigation = ({
  currentLanguageCode,
  isLoggedIn,
  logout,
} : MainNavigationProps) => {
  const {t} = useTranslation();
  const {mode, onThemeChange, theme} = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (code?: CodeType) => {
    if (code) {
      i18n.changeLanguage(code);
    }
    setAnchorEl(null);
  };

  const handleChangeTheme = () => {
    onThemeChange(mode === 'light' ? 'dark' : 'light');
  }

  return (
    <header 
      style={{
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText
      }} 
      className={classes.header}>
      <div className={classes.title}>{t('title')}</div>
      <nav className={classes.nav}>
        <div>
          <Button
            id="demo-mode-button"
            style={{marginRight: '16px'}}
            onClick={handleChangeTheme}>
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </Button>
        </div>
        <div>
          <Button
            id="demo-language-button"
            aria-controls="demo-positioned-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <LanguageIcon />
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleClose()}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
           {languages.map(lang => (
              <MenuItem
                key={lang.code}
                disabled={currentLanguageCode === lang.code}
                onClick={(e) => handleClose(lang.code as CodeType)}>
                  <span
                    style={{marginRight: '8px'}} 
                    className={`flag-icon flag-icon-${lang.country_code} mx-2`}></span>
                  {t(lang.name)}
              </MenuItem>
            ))}
          </Menu>
        </div>
        <ul>
          <li>
            {isLoggedIn && <Button onClick={logout}>{t('logout')}</Button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

interface MainNavigationProps {
  currentLanguageCode: string;
  isLoggedIn: boolean;
  logout: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default MainNavigation;
