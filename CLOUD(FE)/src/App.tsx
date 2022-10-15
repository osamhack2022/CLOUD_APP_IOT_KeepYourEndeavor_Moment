import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthPage from './pages/AuthPage';
import IssueAddPage from './pages/IssueAddPage';
import IssuePage from './pages/IssuePage';
import MainPage from './pages/MainPage';
import NoticeDetailPage from './pages/NoticeDetailPage';
import NoticePage from './pages/NoticePage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';

const App: React.FC = () => {
  return (
    <div>
      <Switch>
        <Route exact component={MainPage} path='/'></Route>
        <Route exact component={AuthPage} path='/login'></Route>
        <Route exact component={RegisterPage} path='/register'></Route>
        <Route exact component={NoticePage} path='/notice'></Route>
        <Route exact component={NoticeDetailPage} path='/notice/:id'></Route>
        <Route exact component={IssuePage} path='/issue'></Route>
        <Route exact component={IssueAddPage} path='/issue/add'></Route>
        <Route exact component={UserPage} path='/user'></Route>
      </Switch>
      <ToastContainer/>
    </div>
  );
}

export default App;
