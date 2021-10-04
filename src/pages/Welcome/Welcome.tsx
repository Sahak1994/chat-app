import {useContext} from 'react';
import { Redirect } from "react-router-dom";

import {AuthContext} from 'context/Auth-context';

const Welcome = () => {
  const {isLoggedIn} = useContext(AuthContext);
  return (
    <div>
      {!isLoggedIn && <Redirect to='/auth' />}
      This is Welcome Page
    </div>
  );
}

export default Welcome;
