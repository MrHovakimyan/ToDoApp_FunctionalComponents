import { useState } from "react";
import "./App.css";

function TodoForm({ onAdd }) {
  const [text, setText] = useState("");

  return (
    <form
      className="todoForm"
      onSubmit={(evt) => {
        evt.preventDefault();
        if (text === "") {
          alert("Please insert text");
          return;
        } else {
          onAdd(text);
        }
        setText("");
      }}
    >
      <input
        className="inputForm"
        type="text"
        value={text}
        onChange={(evt) => {
          setText(evt.target.value);
        }}
      />
      <button className="addBtn">Add</button>
    </form>
  );
}

export default TodoForm;
