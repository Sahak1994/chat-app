import React, {useState} from 'react';
import i18n from "i18next";
import { useTranslation } from "react-i18next";
// import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';
// import {AuthContext} from 'context/Auth-context';

import classes from './Navigation.module.css';

const languages = [
  {code: 'en', name: 'English', country_code: 'gb'},
  {code: 'ru', name: 'Russian', country_code: 'sa'},
]

type CodeType = 'en' | 'ru';

const MainNavigation = ({
  currentLanguageCode,
  isLoggedIn,
  logout,
} : MainNavigationProps) => {
  const {t} = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (code?: CodeType) => {
    if (code) {
      // console.log(code)
      i18n.changeLanguage(code);
    }
    setAnchorEl(null);
  };

  return (
    <header className={classes.header}>
      <div>{t('title')}</div>
      <nav className={classes.nav}>
        <div>
          <Button
            id="demo-positioned-button"
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
           {languages.map(lang => {
             return (
              <MenuItem
                key={lang.code}
                disabled={currentLanguageCode === lang.code}
                onClick={(e) => handleClose(lang.code as CodeType)}>
                  <span
                    style={{marginRight: '8px'}} 
                    className={`flag-icon flag-icon-${lang.country_code} mx-2`}></span>
                  {t(lang.name)}
              </MenuItem>
             );
           })}
          </Menu>
        </div>
        <ul>
          {/* {!isLoggedIn && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )} */}
          {/* {isLoggedIn && (
            <li>
              <Link to='/chat'>Chat</Link>
            </li>
          )} */}
          {/* {isLoggedIn && (
            <li>
              <Link to='/change-password'>Change Password</Link>
            </li>
          )} */}
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
