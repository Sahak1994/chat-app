import {useState, useEffect} from 'react';
// import {Switch, Route, Redirect} from 'react-router-dom';
import {onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut} from 'firebase/auth';
import { useTranslation } from "react-i18next";
// import {collection, getDocs} from 'firebase/firestore';

// import Welcome from 'pages/Welcome/Welcome';
import Chat from 'components/Chat/Chat';
// import Auth from 'pages/AuthPage/Auth';
// import Layout from 'components/Layout/Layout';
// import AuthContextProvider from 'context/Auth-context';
// import ChangePass from 'components/Auth/ChangePass/ChangePass';

import {auth} from 'firebase';
import { Button, Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import MainNavigation from 'components/Layout/Navigation';
import Cookies from 'js-cookie';

// const usersColl = collection(db, 'users');
// const snapshot = getDocs(usersColl);

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
            <Chat
              uid={user.uid}
              displayName={user.displayName || 'Unknown user'}
              photoUrl={user.photoURL || ''} />
          )}
        </Grid>
      </Paper>
    </Grid>
  );

  // return user ? (
  //   <Welcome />
  //   ) : (
  //     <Auth />
  //   );
  
  // return (
  //   <AuthContextProvider>
  //     <Layout>
  //       <Switch>
  //         {user && <Route path='/' component={Welcome} exact />}
  //         <Route path='/auth' component={Auth} />
  //         <Redirect to='/auth' />
  //       </Switch>
  //     </Layout>
  //   </AuthContextProvider>
  // );
}

export default App;
