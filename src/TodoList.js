import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Button } from "@material-ui/core";
import { db } from "./firebase_config";

function TodoList({ todo, in_progress, id }) {
  const toggleProgress = () => {
    db.collection("todos").doc(id).update({
      in_progress: !in_progress,
    });
  };
  const deleteTodo = () => {
    db.collection("todos").doc(id).delete();
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <ListItem>
        <ListItemText
          primary={todo}
          secondary={`${in_progress ? "in progress" : "completed"}`}
        />
      </ListItem>
      <Button onClick={toggleProgress}>{`${
        in_progress ? "Done" : "Undone"
      }`}</Button>
      <Button onClick={deleteTodo}>X</Button>
    </div>
  );
}

export default TodoList;
