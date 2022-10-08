import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';

const App: React.FC = () => {
  return (
    <div>
      <Switch>
        <Route exact component={MainPage} path='/'></Route>
        <Route exact component={AuthPage} path='/login'></Route>

      </Switch>
    </div>
  );
}

export default App;
