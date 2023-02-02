import React from 'react';
import './App.css';
import TodoList from './components/todo-list/TodoList';
import { ContextPravider } from './store/ContextTodo';

function App() {
  return (
    <>
     <ContextPravider>
       <div>
      <TodoList/>
    </div>
    </ContextPravider>
    </>
  );
}

export default App;
 