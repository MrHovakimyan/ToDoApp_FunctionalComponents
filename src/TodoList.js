import TodoItem from "./TodoItem";
import "./App.css";

function TodoList({ todos, onDelete, onChange, onEdite }) {
  return (
    <div className="todoList">
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onChange={onChange}
            onDelete={onDelete}
            onEdite={onEdite}
          />
        );
      })}
    </div>
  );
}

export default TodoList;
