import { TodoItem } from "./TodoItem";

export function TodoList({todos, toggleTodo, deleteTodo}){
    return (
      <ul className="list">
        {/*Used short circuiting to display no todos if the todos array is empty*/}
        {todos.length === 0 && "No Todos"}
        {todos.map((todo) => {
          return (
            <>
              <div>
                <TodoItem
                  {...todo}
                  key={todo.id}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                />
              </div>
            </>
          );
        })}
      </ul>
    )
}