import React from 'react';

import './App.scss';
import { AppContextProvider } from './context/AppContext';
import TodoList from './components/TodoList'

function App() {

  return (
    <AppContextProvider>
      <div className="App">
        <TodoList />
      </div>
    </AppContextProvider>  
  );
}

export default App;
