// import {useContext} from 'react';
// import { Redirect } from "react-router-dom";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

// import {AuthContext} from 'context/Auth-context';

const Welcome = () => {
  // const {isLoggedIn} = useContext(AuthContext);
  return (
    <div>
      {/* {!isLoggedIn && <Redirect to='/auth' />} */}
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          Welcome
        </CardContent>
      </Card>
    </div>
  );
}

export default Welcome;
