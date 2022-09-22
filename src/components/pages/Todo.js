import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

function Todo() {
  const [userId, setUserId] = useState();
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");

  const userData = sessionStorage.getItem("username");

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/user/get/${userData}`)
      .then((response) => response.json())
      .then((response) => setUserId(response.id));
  }, []);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/user/get/${userData}`)
      .then((response) => response.json())
      .then((response) => setTodos(response.todo));
  });

  //----Add todo functionality -----
  const handleCreateTodo = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:5000/todo/add", {
      method: "POST",
      body: JSON.stringify({
        content: content,
        user_fk: userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((response) => console.log(response));
    setContent("");
  };

  const renderTodo = () => {
    return todos.map((todo) => {
      return (
        <div className="todo-wrapper" key={todo.id}>
          <div className="todo-content">{todo.content}</div>
          <button className="button" onClick={(e) => handleDelete(todo.id, e)}>
            Delete
          </button>
        </div>
      );
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:5000/todo/delete/${id}`).then((response) => {
      console.log(response);
      const deletedTodo = todos.filter((item) => item.id !== id);
      setTodos(deletedTodo);
    });
  };

  if (!todos) {
    return <Redirect to="/todo" />;
  }
  return (
    <div>
      <div className="forms-wrapper" onSubmit={handleCreateTodo}>
        <form className="form">
          <h3 className="form-title">What Do You Need To Do?</h3>
          <div className="todo-input-wrapper">
            <input
              className="todo-input"
              type="content"
              placeholder="What ToDo?"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </div>
          <div className="button-wrapper">
            <button className="add-todo-button" type="submit">
              Add
            </button>
          </div>
        </form>
        <div className="todos-wrapper">
          <h2 className="todo-title">What To Do?</h2>
          <div className="render-wrapper">
            <div className="todos">{renderTodo()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
