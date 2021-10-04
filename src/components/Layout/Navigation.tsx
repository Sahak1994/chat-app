import {useContext} from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import {AuthContext} from 'context/Auth-context';

import classes from './Navigation.module.css';

const MainNavigation = () => {
  const {isLoggedIn, onLogout} = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div>Chat Exalt</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to='/chat'>Chat</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to='/change-password'>Change Password</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Button onClick={onLogout}>Logout</Button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
