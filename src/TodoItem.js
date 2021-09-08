import "./TodoItem.css";
function TodoItem({ todo, onChange, onDelete, onEdite }) {
  return (
    <div className="todoItem">
      <label>
        {todo.text}
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={(evt) => {
            onChange({
              ...todo,
              isCompleted: evt.target.checked,
            });
          }}
        />
        <button
          className="deleteBtn"
          onClick={() => {
            onDelete(todo);
          }}
        >
          Remove
        </button>
        <button
          className="editeBtn"
          onClick={(evt) => {
            onEdite({
              ...todo,
              text: evt.target.value,
            });
          }}
        >
          Edite
        </button>
      </label>
    </div>
  );
}

export default TodoItem;
