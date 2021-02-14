"use strict";
  const todoControl = document.querySelector(".todo-control"),
    headerInput = document.querySelector(".header-input"),
    todoList = document.querySelector(".todo-list"),
    todoCompleted = document.querySelector(".todo-completed");

  let todoData = [];
  const render = function (data) {
    todoList.textContent = "";
    todoCompleted.textContent = "";

    data.forEach(function (item) {
      const li = document.createElement("li");
      li.classList.add("todo-item");

      li.innerHTML =
        "<span class='text-todo'>" +
        item.value +
        "</span>" +
        "<div class='todo-buttons'>" +
        "<button class='todo-remove'></button>" +
        "<button class='todo-complete'></button>" +
        "</div>";

      if (item.completed) {
        todoCompleted.append(li);
      } else {
        todoList.append(li);
      }

      const btntodoComplete = li.querySelector(".todo-complete");
      btntodoComplete.addEventListener("click", function () {
        item.completed = !item.completed;
        render(data);
      });

      const btntodoRemove = li.querySelector(".todo-remove");
      btntodoRemove.addEventListener("click", function () {
        let indexOfObj = data.findIndex((i) => i.value === li.textContent);
        data.splice(indexOfObj, 1);
        const todoButtons = this.parentNode,
          parentLi = todoButtons.parentNode;
        parentLi.remove();
        localStorage.removeItem("todos", JSON.stringify(data[indexOfObj]));
        render(data);
      });
      localStorage.setItem("todos", JSON.stringify(data));
    });
  };

  const oldData = localStorage.getItem("todos");
 
    todoData = JSON.parse(oldData);
    render(todoData);
    
  todoControl.addEventListener("submit", function (e) {
    e.preventDefault();

    const newToDo = {
      value: headerInput.value,
      completed: false,
    };

    if (headerInput.value !== "") {
      todoData.push(newToDo);
      headerInput.value = "";
      render(todoData);
    }
  });
