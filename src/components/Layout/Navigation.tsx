// import {useContext} from 'react';
// import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
// import {AuthContext} from 'context/Auth-context';

import classes from './Navigation.module.css';

const MainNavigation = ({
  isLoggedIn,
  logout,
}: {
  isLoggedIn: boolean;
  logout: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  // const {isLoggedIn, onLogout} = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <div>Chat Exalt</div>
      <nav>
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
            {isLoggedIn && <Button onClick={logout}>Logout</Button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
