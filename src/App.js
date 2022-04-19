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

  const [currentItem, setCurrentItem] = useState();

  // Drag and Drop func handlers
  function handleDragStart(evn, todos) {
    evn.target.classList.add("dragging");
    const todoArr = todos.map((elem) => elem.id);
    elemIndex = todoArr.indexOf(Number(evn.target.getAttribute("data-index")));
    console.log("dragged elemIndex in dragStart: ", elemIndex);
  }

  function handleDragEnd(evn, todos) {
    // debugger;
    if (elemIndex < draggedOverElemIndex) {
      todos.splice(draggedOverElemIndex, 0, todos[elemIndex]); // replacing draggedOverElemIndex
      todos.splice(elemIndex, 1); // removing elemIndex
    } else if (elemIndex > draggedOverElemIndex) {
      const removedElem = todos.splice(elemIndex, 1);
      todos.splice(draggedOverElemIndex, 0, removedElem[0]);
    }
    setTodos([...todos]);

    console.log("todos in dragend: ", todos);
    console.log("draggedOverElemIndex in dragEnd", draggedOverElemIndex);

    evn.target.classList.remove("dragging");
    draggedOverElemIndex = undefined;
    elemIndex = undefined;
  }

  function handleDragOver(evn, todos) {
    evn.preventDefault();

    const todoArr = todos.map((elem) => elem.id);
    draggedOverElemIndex = todoArr.indexOf(Number(evn.target.getAttribute("data-index")));
  }

  function handleDrop(evn) {
    evn.preventDefault();
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
        onDragStart={(e) => handleDragStart(e, todos)}
        onDragEnd={(e) => handleDragEnd(e, todos)}
        onDragOver={(e) => handleDragOver(e, todos)}
        onDrop={(e) => handleDrop(e)}
      >
        {/* ----- ToDo column ----- */}
        <div className="toDoColumn">
          <div className="toDoColumn-Lbl">ToDo</div>
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
          <div className="inProgressColumn-Lbl">In progress</div>
        </div>
        {/* ----- Done column ----- */}
        <div className="doneColumn">
          <div className="doneColumn-Lbl">Done</div>
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
