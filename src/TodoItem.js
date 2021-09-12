import "./TodoItem.css";
function TodoItem({ todo, onChange, onDelete, onEdit }) {
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
          className="editBtn"
          onClick={(evt) => {
            onEdit({
              ...todo,
              text: evt.target.value,
            });
          }}
        >
          Edit
        </button>
      </label>
    </div>
  );
}

export default TodoItem;
