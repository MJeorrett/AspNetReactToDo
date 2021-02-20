import React, {  } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './pages/Home';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer />
      <HomePage />
    </Provider>
  );
}

export default App;
