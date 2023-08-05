export function TodoItem( {completed, id, title, toggleTodo, deleteTodo}){
    return (
      <>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <li>
            <label>
              <input
                type="checkbox"
                onChange={(e) => toggleTodo(id, e.target.checked)}
                checked={completed}
              />
              {title}
            </label>
          </li>
          {/*for the delete, call a function that calls deleteTodo(), don't call it directly */}
          <button onClick={() => deleteTodo(id)} className="btn btn-danger">
            Delete
          </button>
        </div>
      </>
    );
}