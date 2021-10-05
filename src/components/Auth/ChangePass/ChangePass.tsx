import {useState} from 'react';

import { Button } from '@mui/material';
import TextField from 'elements/Input/InputField';

import classes from './ChangePass.module.css';

const ChangePass = () => {
  const [password, setPassword] = useState('');

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const password = e.target.value;

    setPassword(password);
  }

  return (
    <form className={classes.form}>
      <div>
        {/* <label htmlFor='new-password'>New Password</label> */}
        <TextField 
          type='password' 
          label='password' 
          onChange={onPasswordChange}
          value={password} />
      </div>
      <div className={classes.action}>
        <Button>Change Password</Button>
      </div>
    </form>
  );
}

// interface ChangePassProps {

// }

export default ChangePass;
