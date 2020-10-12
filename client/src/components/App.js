import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import { fetchUser } from '../actions/index';
import { useDispatch } from 'react-redux';
import Landing from '../components/Landing';
import Dashboard from '../components/Dashboard';
import SurveyNew from '../components/surveys/SurveyNew';

// Development only axios helpers 
import axios from 'axios';
window.axios = axios;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserRequest = () => { 
      dispatch(fetchUser());
    }

    fetchUserRequest();
  }, [])

  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Route exact component={Dashboard} path='/surveys' />
        <Route exact component={SurveyNew} path='/surveys/new' />
        <Route exact component={Landing} path='/' />
      </BrowserRouter>
    </div>
  );
}

export default App;
