import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Todo() {
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState();
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");

  const userData = sessionStorage.getItem("username");

  useEffect(() => {
    fetch(`https://intense-basin-26666.herokuapp.com/user/get/${userData}`)
      .then((response) => response.json())
      .then((response) => setUserId(response.id));
  }, []);

  useEffect(() => {
    fetch(`https://intense-basin-26666.herokuapp.com/user/get/${userData}`)
      .then((response) => response.json())
      .then((response) => setUser(response.username));
  }, []);

  useEffect(() => {
    fetch(`https://intense-basin-26666.herokuapp.com/user/get/${userData}`)
      .then((response) => response.json())
      .then((response) => setTodos(response.todo));
  }, [todos]);

  //----Add todo functionality -----
  const handleCreateTodo = (event) => {
    if (content === "") {
      event.preventDefault();
      return alert("Please enter text before submitting");
    } else {
      event.preventDefault();
      fetch("https://intense-basin-26666.herokuapp.com/todo/add", {
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
    }
  };

  const renderTodo = () => {
    return todos.map((todo) => {
      return (
        <div className="todo-wrapper" key={todo.id}>
          <div className="todo-element-wrapper">
            <div className="todo-content">{todo.content}</div>
            <div className="button-wrapper">
              <button className="button" onClick={(e) => handleDelete(todo.id)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://intense-basin-26666.herokuapp.com/todo/delete/${id}`)
      .then((response) => {
        console.log(response);
        const deletedTodo = todos.filter((item) => item.id !== id);
        setTodos(deletedTodo);
      });
  };

  if (!todos) {
    return <Redirect to="/todo" />;
  } else {
    return (
      <div>
        <div className="welcome-user-wrapper">
          <h2>Welcome</h2> <h2 className="user">{user}</h2>
        </div>
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
}

export default Todo;
