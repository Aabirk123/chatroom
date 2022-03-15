import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './components/home';
import React from 'react';
import Header from './components/header';
import SignUp from './components/register';
import SignIn from './components/login';
import SignOut from './components/logout';
import GetRoom from './components/room';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/register' element={<SignUp/>}/>
          <Route path='/login' element={<SignIn/>}/>
          <Route path='/logout' element={<SignOut/>}/>
          <Route path='room/:roomid' element={<GetRoom/>}/>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
