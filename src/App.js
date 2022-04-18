import { useState } from "react";
import "./App.css";
import TodoFooter from "./TodoFooter";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

let draggedOverElemIndex;

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

  const [currentItem, setCurrentItem] = useState();

  // Drag and Drop func handlers
  function handleDragStart(evn) {
    evn.target.classList.add("dragging");
    console.log("dragStart", evn.target);
    setCurrentItem(evn.target);
  }

  function handleDragEnd(evn, todos) {
    console.log("todos: ", todos);
    const elemIndex = todos
      .map((elem) => elem.id)
      .indexOf(Number(evn.target.getAttribute("data-index")));
    console.log("elem index", elemIndex);
    debugger;
    if (elemIndex < draggedOverElemIndex) {
      todos.splice(todos[draggedOverElemIndex], 0, todos[elemIndex]); // replacing draggedOverElemIndex
      todos.splice(todos[elemIndex], 1); // removing elemIndex
    } else if (elemIndex > draggedOverElemIndex) {
      const removedElem = todos.splice(todos[elemIndex], 1);
      todos.splice(todos[draggedOverElemIndex], 0, removedElem[0]);
    }
    console.log("todos in DragEnd: ", todos);
    evn.target.classList.remove("dragging");
    console.log("dragEnd", evn.target);
    draggedOverElemIndex = undefined;
  }

  function handleDragOver(evn, todos) {
    evn.preventDefault();

    draggedOverElemIndex = todos
      .map((elem) => elem.id)
      .indexOf(Number(evn.target.getAttribute("data-index")));
    console.log("dragOver:");
  }

  function handleDrop(evn, todos) {
    evn.preventDefault();
    setTodos([...todos]);
    console.log("drop", evn.target);
  }

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

      <div
        className="columnsWrpr"
        onDragStart={(e) => handleDragStart(e)}
        onDragEnd={(e) => handleDragEnd(e, todos)}
        onDragOver={(e) => handleDragOver(e, todos)}
        onDrop={(e) => handleDrop(e, todos)}
      >
        {/* ----- ToDo column ----- */}
        <div className="toDoColumn">
          <label className="toDoColumn-Lbl">ToDo</label>
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
        {/* ----- In Progress column ----- */}
        <div className="inProgressColumn">
          <label className="inProgressColumn-Lbl">In progress</label>
        </div>
        {/* ----- Done column ----- */}
        <div className="doneColumn">
          <label className="doneColumn-Lbl">Done</label>
        </div>
      </div>

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
