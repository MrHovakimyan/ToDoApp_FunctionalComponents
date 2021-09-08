import "./App.css";
function TodoFooter({ todos, onClearCompleted, onClearAll }) {
  const completedTasks = todos.filter((todo) => todo.isCompleted).length;
  return (
    <div className="todoFooter">
      <span>
        {completedTasks}/ {todos.length} Completed
      </span>
      <button className="completedBtn" onClick={onClearAll}>
        Clear All
      </button>
      <button className="completedBtn" onClick={onClearCompleted}>
        Clear Completed
      </button>
    </div>
  );
}

export default TodoFooter;
