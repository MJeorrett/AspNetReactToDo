import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { getAllToDos } from './api/todos';
import HomePage from './pages/Home';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
}

export default App;
