//Selectors
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

//todo data
let todos = [];

//Functions
function addTodo() {
  event.preventDefault();
  const todoText = todoInput.value.trim();

  if (todoText !== '') {
    const todo = {
      id: Date.now(),
      text: todoText,
      completed: false
    };
    todos.push(todo);
    renderTodoList();
    todoInput.value = '';
  }
}

function toggleTodoStatus(todoId) {
  todos = todos.map(todo => {
    if (todo.id === todoId) {
      return {
        ...todo,
        completed: !todo.completed
      };
    }
    return todo;
  });
  renderTodoList();
}

function deleteTodo(todoId) {
  todos = todos.filter(todo => todo.id !== todoId);
  renderTodoList();
}

function renderTodoList() {
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const todoItem = document.createElement('li');
    todoItem.textContent = todo.text;
    todoItem.classList.add('todo-item');
    if (todo.completed) {
      todoItem.classList.add('completed');
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => deleteTodo(todo.id));

    todoItem.appendChild(deleteButton);
    todoItem.addEventListener('click', () => toggleTodoStatus(todo.id));
    todoList.appendChild(todoItem); // Corrected the variable name here
  });
}

//Event Listeners
todoForm.addEventListener('submit', addTodo);
