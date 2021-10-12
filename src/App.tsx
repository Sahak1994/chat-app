import {useState, useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import {onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut} from 'firebase/auth';
import {setUserProperties} from 'firebase/analytics';
import { analytics } from 'firebase';
import { useTranslation } from "react-i18next";
import {auth} from 'firebase';
import Cookies from 'js-cookie';

import Chat from 'components/Chat/Chat';
import Room from 'components/Room/Room';
import MainNavigation from 'components/Layout/Navigation';

import { Button, Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
});

const paperStyle = {
  padding: '30px 20px',
  width: '70%',
  margin: '20px auto',
};

function App() {
  const currentLanguageCode = Cookies.get('i18next') || 'en';
  const {t} = useTranslation();
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  const styles = useStyles();

  const signinWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    auth.useDeviceLanguage();

    try {
      await signInWithPopup(auth, provider);
    } catch(error) {
      console.log('error', error)
    }
  }

  const logout = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      await signOut(auth);
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setUserProperties(analytics, {
      testing: 'test_property!'
    })
    const unSubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      if (initializing) {
        setInitializing(false);
      }
    });

    return unSubscribe;
  }, [initializing])

  useEffect(() => {
    document.title = t('title')
  }, [currentLanguageCode, t])

  return (
    <Grid>
      <MainNavigation
        currentLanguageCode={currentLanguageCode}
        isLoggedIn={!!user}
        logout={logout} />
      <Paper elevation={20} style={paperStyle}>
        <Grid className={styles.root}>
          {initializing ? <div>{t('loading')}...</div> : 
          !user ? <Button onClick={signinWithGoogle}>{t('sign_in')}</Button> : (
            <Switch>
              <Route path='/' exact>
                <Chat
                  uid={user.uid}
                  displayName={user.displayName || 'Unknown user'}
                  photoUrl={user.photoURL || ''} />
              </Route>
              <Route path='/:userId'>
                <Room 
                  uid={user.uid}
                  displayName={user.displayName || 'Unknown user'}
                  photoUrl={user.photoURL || ''} />
              </Route>
            </Switch>
          )}
        </Grid>
      </Paper>
    </Grid>
  );
}

export default App;
