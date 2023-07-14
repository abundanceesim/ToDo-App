import { useState } from 'react';
import './styles.css'
import { NewTodoForm } from './NewTodoForm';
import { TodoList } from './TodoList';
import { useEffect } from 'react';

// you can only ever return 1 element for a react component.
// so to have multiple, create a big fragment or div and nest
// other components inside it

// Hooks need to be at the top of the function.
// Also, they can't be put in conditions, loops or returns
export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title){
      setTodos((currentTodos) => {
        return [
          ...currentTodos,
          { id: crypto.randomUUID(), title, completed: false },
        ];
      });
  }

  function toggleTodo(id, completed){
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        // if my todo's id is the current id:
        if (todo.id === id) {
          //return the new todo with completed  = true
          return { ...todo, completed }
        }
        // otherwise just return the todo anyways
        return todo
      })
    })
  }

  function deleteTodo(id){
    setTodos( currentTodos => {
      // return all other todos apart from the one where delete was clicked
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <NewTodoForm  onSubmit={addTodo}/>
      <h1 className="header">Todo list</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </>
  );
}
