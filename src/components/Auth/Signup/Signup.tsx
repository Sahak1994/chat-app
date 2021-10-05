import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {makeStyles} from '@mui/styles';
import TextField from 'elements/Input/TextFieldUncontroled';
import { sendRequestToAuth } from 'components/Auth/actions';
import {AuthContext} from 'context/Auth-context';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
});

const paperStyle = {
  padding: '30px 20px',
  width: 300,
  margin: '20px auto',
};


const Signup = ({
  onGoToSignin
} : SignupProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const {
    onLogin,
  } = useContext(AuthContext);
  const classes = useStyles();

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const email = e.target.value;

    setEmail(email);
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const password = e.target.value;

    setPassword(password);
  }

  const onSendRequestToAuth = (url: string) => {
    setIsLoading(true);

    sendRequestToAuth(url, JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }))
    .then(response => {
      setIsLoading(false);
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then((data) => {
          const errorMessage = data?.error?.message || 'Authentication failed!';
          throw new Error(errorMessage)
        });
      }
    })
    .then(data => {
      onLogin(data.idToken);
      history.push('/')
    })
    .catch(error => {
      alert(error);
    })
  }

  const signUp = (event: React.FormEvent) => {
    event.preventDefault();

    onSendRequestToAuth(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
      process.env.REACT_APP_FIREBASE_API_KEY}`
    );
  }

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid className={classes.root}>
          <h2>Sign Up</h2>
          <Typography variant='caption'>
            Please fill this form to create an account!
          </Typography>
        <form onSubmit={signUp}>
            <TextField
              value={email}
              onChange={onEmailChange}
              type='email'
              label='email' />

            <TextField
              value={password}
              onChange={onPasswordChange}
              type='password'
              label='password' />

          <Button
            onClick={signUp}
            disabled={isLoading}>Sign up</Button>
          </form>
          <p 
            style={{marginTop: '8px'}}>
              Already have an account? <Button onClick={onGoToSignin}>Log In</Button>
          </p>
        </Grid>
      </Paper>
    </Grid>
  );
}

interface SignupProps {
  onGoToSignin: () => void;
}

export default Signup;
