"use strict";

function storageAvailable(type) {
  try {
    let storage = window[type],
      x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}

if (storageAvailable("localStorage")) {
  const todoControl = document.querySelector(".todo-control"),
    headerInput = document.querySelector(".header-input"),
    todoList = document.querySelector(".todo-list"),
    todoCompleted = document.querySelector(".todo-completed");

  const todoData = [];

  const render = function () {
    todoList.textContent = "";
    todoCompleted.textContent = "";

    todoData.forEach(function (item) {
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
        render();
      });

      const btntodoRemove = li.querySelector(".todo-remove");
      btntodoRemove.addEventListener("click", function () {
        let indexOfObj = todoData.findIndex((i) => i.value === li.textContent);
        todoData.splice(indexOfObj, 1);
        const todoButtons = this.parentNode,
          parentLi = todoButtons.parentNode;
        parentLi.remove();
        localStorage.removeItem("todos", JSON.stringify(todoData[indexOfObj]));
        render();
      });
      localStorage.setItem("todos", JSON.stringify(todoData));
    });
  };

  todoControl.addEventListener("submit", function (e) {
    e.preventDefault();

    const newToDo = {
      value: headerInput.value,
      completed: false,
    };

    if (headerInput.value !== "") {
      todoData.push(newToDo);
      headerInput.value = "";
    }

    render();
  });

  render();
} else {
  alert("This browser does not have localStorage");
}
