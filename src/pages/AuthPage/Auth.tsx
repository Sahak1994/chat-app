import { useState } from 'react';

import Signin from 'components/Auth/Signin/Signin';
import Signup from 'components/Auth/Signup/Signup';

type authPage = 'signin' | 'signup';

const Auth = () => {
  const [authPage, setAuthPage] = useState<authPage>('signin');

  const goToSignIn = () => setAuthPage('signin');
  const goToSignUp = () => setAuthPage('signup');

  return authPage === 'signin' ? (
    <Signin 
      onGoToSignup={goToSignUp} />
  ) : (
    <Signup onGoToSignin={goToSignIn} />
  );
}

export default Auth;
