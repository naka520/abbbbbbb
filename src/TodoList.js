import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, toggleTodo }) => {
  return todos.map((todo) => (
    <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
  ));
  //mapは配列の処理を行った後配列として返す
};

export default TodoList;