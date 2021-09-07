import TodoItem from "./TodoItem";
import "./App.css";

function TodoList({ todos, onDelete, onChange, onEdit }) {
  return (
    <div className="todoList">
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onChange={onChange}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        );
      })}
    </div>
  );
}

export default TodoList;
