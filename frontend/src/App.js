import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Dashboard from './components/Dashboard';
// import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <div className="background"></div>
      <div className="container">
        <Dashboard />
      </div>
    </Provider>
  );
};

export default App;

