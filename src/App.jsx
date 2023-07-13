import { useState } from 'react';
import './styles.css'


// you can only ever return 1 element for a react component.
// so to have multiple, create a big fragment or div and nest
// other components inside it
export default function App() {
  const [newItem, setNewItem]  = useState('')
  const [todos, setTodos] = useState([])

  function handleSubmit(e) {
    e.preventDefault();

    setTodos( (currentTodos)=> {
      return [
        ...currentTodos, 
        {id: crypto.randomUUID(), title: newItem, completed: false}
      ]
    })

    setNewItem('')
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
      <form onSubmit={handleSubmit} className="new-item-form" action="">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          {/* each time an event is fired for the input, set its text */}
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
            id="item"
          />
          <button className="btn">Add</button>
        </div>
      </form>
      <h1 className="header">Todo list</h1>
      <ul className="list">
        {/*Used short circuiting to display no todos if the todos array is empty*/}
        {todos.length === 0 && "No Todos"}
        {todos.map((todo) => {
          return(
          <li key={todo.id}>
            <label>
              <input type="checkbox" checked={todo.completed} onChange={e => toggleTodo(todo.id, e.target.checked)} />
              {todo.title}
            </label>
            {/*for the delete, call a function that calls deleteTodo(), don't call it directly */}
            <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger">Delete</button>
          </li>
          )
        })}
      </ul>
    </>
  );
}
