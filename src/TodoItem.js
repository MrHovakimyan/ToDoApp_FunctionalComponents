import "./App.css";
function TodoItem({ todo, onChange, onDelete, onEdit }) {
  return (
    <div className="todoItemWrp draggable" draggable="true">
      <label className="toDoItemLbl">
        <input
          className="toDoItemLblCheckBox"
          type="checkbox"
          checked={todo.isCompleted}
          onChange={(evt) => {
            onChange({
              ...todo,
              isCompleted: evt.target.checked,
            });
          }}
        />
        {todo.text}
      </label>
      <div className="todoItem">
        <button
          className="todoItemBtn"
          onClick={() => {
            onDelete(todo);
          }}
        >
          Remove
        </button>
        <button
          className="todoItemBtn"
          onClick={(evt) => {
            onEdit({
              ...todo,
              text: evt.target.value,
            });
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
