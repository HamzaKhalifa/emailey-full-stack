import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import { fetchUser } from '../actions/index';
import { useDispatch } from 'react-redux';
import Landing from '../components/Landing';

const Dashboard = () => (<h2>Dashboard</h2>)
const SurveyNew = () => (<h2>SurveyNew</h2>)

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
