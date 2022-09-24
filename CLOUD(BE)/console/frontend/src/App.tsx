import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthPage from './pages/AuthPage';

const App: React.FC = () => {
  return (
    <div>
      <Switch>
        <Route exact component={AuthPage} path='/login'></Route>
      </Switch>
    </div>
  );
}

export default App;
