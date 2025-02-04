import React from "react";

// tasks
const tasks = [
  { id: 1, text: "read about a given topic" },
  { id: 2, text: "complete the assignments" },
  { id: 3, text: "go to gym" },
  { id: 4, text: "clean the house" },
];

// TodoList Component
const TodoList = () => {
  return (
    <>
      <h1>Todo List</h1>
      <ol>
        {tasks.map((task) => (
          <li key={task.id}>{task.text}</li>
        ))}
      </ol>
    </>
  );
};

export default TodoList;
