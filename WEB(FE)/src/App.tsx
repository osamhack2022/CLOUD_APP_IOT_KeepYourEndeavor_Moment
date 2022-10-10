import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import IssueAddPage from './pages/IssueAddPage';
import IssuePage from './pages/IssuePage';
import MainPage from './pages/MainPage';
import NoticeAddPage from './pages/NoticeAddPage';
import NoticePage from './pages/NoticePage';
import UserPage from './pages/UserPage';

const App: React.FC = () => {
  return (
    <div>
      <Switch>
        <Route exact component={MainPage} path='/'></Route>
        <Route exact component={AuthPage} path='/login'></Route>
        <Route exact component={NoticePage} path='/notice'></Route>
        <Route exact component={NoticeAddPage} path='/notice/add'></Route>
        <Route exact component={IssuePage} path='/issue'></Route>
        <Route exact component={IssueAddPage} path='/issue/add'></Route>
        <Route exact component={UserPage} path='/user'></Route>
      </Switch>
    </div>
  );
}

export default App;
