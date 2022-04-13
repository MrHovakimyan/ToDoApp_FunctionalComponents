import { useState } from "react";
import "./App.css";
import TodoFooter from "./TodoFooter";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
// import DragDrop from "./DragDrop";

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

  return (
    <>
      <div className="App">
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

        <div className="columnWrpr">
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
          <div className="inProgressColumn">
            <label className="inProgressColumn-Lbl">In progress</label>
          </div>
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
    </>
  );
}

export default App;
