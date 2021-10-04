
import {Switch, Route} from 'react-router-dom';

import Welcome from 'pages/Welcome/Welcome';
import Auth from 'pages/AuthPage/Auth';
import Layout from 'components/Layout/Layout';
import AuthContextProvider from 'context/Auth-context';
import ChangePass from 'components/Auth/ChangePass/ChangePass';


function App() {
  return (
    <AuthContextProvider>
      <Layout>
        <Switch>
          <Route path='/' component={Welcome} exact />
          <Route path='/auth' component={Auth} />
          <Route path='/change-password' component={ChangePass} />
        </Switch>
      </Layout>
    </AuthContextProvider>
  );
}

export default App;
