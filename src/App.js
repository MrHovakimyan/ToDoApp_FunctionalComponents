import { useState } from "react";
import "./App.css";
import TodoFooter from "./TodoFooter";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

let draggedOverElemIndex;
let elemIndex;

function App() {
  const [todos, setTodos] = useState([
    {
      id: Math.random(),
      text: "Learn History",
      isCompleted: false,
    },
    {
      id: Math.random(),
      text: "Buy a book",
      isCompleted: false,
    },
    {
      id: Math.random(),
      text: "Meet friends",
      isCompleted: false,
    },
  ]);

  /* ---- Drag and Drop func handlers ---- */
  function handleDragStart(evn, todos) {
    evn.target.classList.add("dragging");
    elemIndex = todos.map((elem) => elem.id).indexOf(Number(evn.target.getAttribute("data-index")));
  }

  function handleDragEnd(evn, todos) {
    if (elemIndex < draggedOverElemIndex) {
      todos.splice(draggedOverElemIndex, 0, todos[elemIndex]); // replacing draggedOverElemIndex
      todos.splice(elemIndex, 1); // removing elemIndex
    } else if (elemIndex > draggedOverElemIndex) {
      const removedElem = todos.splice(elemIndex, 1);
      todos.splice(draggedOverElemIndex, 0, removedElem[0]);
    }
    setTodos([...todos]);

    evn.target.classList.remove("dragging");
    draggedOverElemIndex = undefined;
    elemIndex = undefined;
  }

  function handleDragOver(evn, todos) {
    evn.preventDefault();
    draggedOverElemIndex = todos
      .map((elem) => elem.id)
      .indexOf(Number(evn.target.getAttribute("data-index")));
  }
  /* ---------------------------------------------------------- */

  return (
    <div className="App">
      {/* ----- ToDo Title and Form ----- */}
      <div className="todoTitle">
        <label>Things that need to be done!!!</label>
        <TodoForm
          onAdd={(text) => {
            setTodos([
              // we need to pass new arr, otherwise "react" won't update the state
              ...todos,
              {
                id: Math.random(),
                text: text,
                isCompleted: false,
              },
            ]);
          }}
        />
      </div>

      {/* ----- ToDo Item's List ----- */}
      <div
        className="toDoColumn"
        onDragStart={(e) => handleDragStart(e, todos)}
        onDragEnd={(e) => handleDragEnd(e, todos)}
        onDragOver={(e) => handleDragOver(e, todos)}
      >
        <TodoList
          todos={todos}
          onDelete={(todo) => {
            setTodos(todos.filter((t) => t.id !== todo.id));
          }}
          onChange={(newTodo) => {
            setTodos(
              todos.map((todo) => {
                if (todo.id === newTodo.id) {
                  return newTodo;
                }
                return todo;
              })
            );
          }}
          onEdit={(newTodo) => {
            let newInput;
            todos.map((todo) => {
              if (todo.id === newTodo.id) {
                newInput = prompt("Task need to be edited ? Type it...", todo.text);
              }
              return newInput;
            });

            setTodos(
              todos.map((todo) => {
                if (todo.id === newTodo.id) {
                  if (newInput === "") {
                    alert("Please enter any text");
                    return todo;
                  } else if (newInput === null) {
                    return todo;
                  }
                  todo.text = newInput;
                  return todo;
                }
                return todo;
              })
            );
          }}
        />
      </div>

      {/* ----- ToDo Footer ----- */}
      <TodoFooter
        todos={todos}
        onClearCompleted={() => {
          setTodos(todos.filter((todo) => !todo.isCompleted));
        }}
        onClearAll={() => {
          setTodos([]);
        }}
      />
    </div>
  );
}

export default App;
