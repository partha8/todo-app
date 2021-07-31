import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./App.css";
import { db } from "./firebase_config";
import firebase from "firebase";

import { useEffect, useState } from "react";
import TodoList from "./TodoList";

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  // there are multiple ways to get docs, but what snapshot does is it gets data if we make changes
  // in real time
  const getTodos = () => {
    db.collection("todos").onSnapshot((querySnapshot) => {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          in_progress: doc.data().in_progress,
        }))
      );
    });
  };
  const addTodo = (e) => {
    e.preventDefault();
    db.collection("todos").add({
      in_progress: true,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput,
    });
    setTodoInput("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="App"
    >
      <h1>Todo List</h1>
      <form>
        <TextField
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          id="standard-basic"
          label="Write a Todo"
        />
        <Button
          type="submit"
          style={{ display: "none" }}
          onClick={(e) => addTodo(e)}
        >
          Submit
        </Button>
      </form>
      <section style={{ width: "50vw", marginTop: "2rem" }}>
        {todos.map((item) => {
          return <TodoList {...item} />;
        })}
      </section>
    </div>
  );
}

export default App;
