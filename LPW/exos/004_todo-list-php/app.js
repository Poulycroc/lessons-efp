const todosList = JSON.parse(localStorage.getItem("todosList") || "[]");

const todosListContainer = document.getElementById('todos-list-container');
const newTodoInput = document.getElementById('todo-input');

/**
 * we want to make sure our DOM is ready
 */
document.addEventListener("DOMContentLoaded", function() {
  writeTodosList();
});


/**
 * Here it's my function for get new item from the text input
 * an addEventListener on "enter" key
 */
newTodoInput.addEventListener("keypress", function (event) {
  if (event.key !== "Enter") return

  todosList.unshift({
    id: todosList.length,
    label: this.value,
    isDone: false,
  });

  saveTodoListToLocalStorage(); // save in the localStorage
  newTodoInput.value = ''; // clean the input
  writeTodosList(); // re-write the todolist in the html
})

/**
 * here I set the function when I get a checkbox change
 *
 * @param {Number} todoId
 */
function handleTodoChecked(todoId) {
  // we search the todoList's index with the good id
  const index = todosList.findIndex(todo => todo.id === todoId);

  // we toggle the value
  todosList[index].isDone = !todosList[index].isDone

  // save and write todo 
  saveTodoListToLocalStorage()
  writeTodosList()
}

/**
 * @param {Number} todoId
 */
function handleDeleteTodo(todoId) {
  const index = todosList.findIndex(todo => todo.id === todoId);
  todosList.splice(index, 1);

  saveTodoListToLocalStorage();
  writeTodosList();
}

function handleEditTodo(todoItemRef) {
  const focusItem = document.getElementById(todoItemRef)
  console.log({ focusItem })
  focusItem.classList.toggle('is-edit-mode')
}

function handleCancelEdition(todoItemRef, todoInputRef, baseLabel) {
  const todoInput = document.getElementById(todoInputRef)
  const focusItem = document.getElementById(todoItemRef)
  
  todoInput.value = baseLabel
  focusItem.classList.toggle('is-edit-mode')
}

function handleSaveEdition(todoItemRef, todoInputRef, todoId) {
  const todoInput = document.getElementById(todoInputRef)
  const focusItem = document.getElementById(todoItemRef)

  const index = todosList.findIndex(todo => todo.id === todoId);
  todosList[index].label = todoInput.value
  
  saveTodoListToLocalStorage();
  writeTodosList();
}

/**
 * this function gonna write the todolist in html
 */
const writeTodosList = () => {
  todosListContainer.innerHTML = todosList.length === 0
    ? noTodosAlert
    : constructTodoListHTML()
}

/**
 * here we gonna save our todo list in localStorage
 */
const saveTodoListToLocalStorage = () => {
  localStorage.setItem("todosList", JSON.stringify(todosList));
}

/**
 * I like to prepare my html list separatly for more clean look
 *
 * @return {Html}
 */
const constructTodoListHTML = () => {
  const htmlList = []
  for (let index = 0; index < todosList.length; index++) {
    const element = todoItemTemplate(todosList[index]);
    htmlList.push(element)
  }
  return htmlList.join('')
}

/**
 * gonna return an html with correct data from the todoitem
 *
 * @param {Object} todo
 * @return {Html}
 */
const todoItemTemplate = (todo) => {
  const todoRef = `todo__${todo.id}`
  const todoItemRef = `todo-item__${todo.id}`

  return `<div 
      class="todo-item ${todo.isDone ? 'item-is-done' : ''}"
      id="${todoItemRef}"
    >
		<input 
		  class="hidden" 
		  type="checkbox" 
		  id="${todoRef}"
		  ${todo.isDone ? 'checked' : ''}
		  onchange="handleTodoChecked(${todo.id})"
		>
		<label class="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-900" for="${todoRef}">
			<span class="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-500 rounded-full">
				<svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
				</svg>
			</span>
			<span class="todo-item--label ml-4 text-sm">${todo.label}</span>
			<div class="text-item--edit flex ml-4 w-full">
			  <input 
			    type="text"
			    class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			    value="${todo.label}" 
			    id="edit-input__${todoRef}" 
			  />
			  <button class="marg-l-auto" type="button" onClick="handleCancelEdition('${todoItemRef}', 'edit-input__${todoRef}', '${todo.label}')">
			    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
			    </svg>
			  </button>
			  <button class="marg-l-10" type="button" onClick="handleSaveEdition('${todoItemRef}', 'edit-input__${todoRef}', ${todo.id})">
			    <svg class="w-4 h-4 fill-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
			    </svg>
			  </button>
			</div>

			<button class="actions-btn edit-btn-icon marg-l-auto" type="button" onClick="handleEditTodo('${todoItemRef}')"> 
			  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
			  </svg>
			</button>
			<button class="actions-btn delete-btn-icon marg-l-10" type="button" onClick="handleDeleteTodo(${todo.id})">
			  <svg class="w-4 h-4 fill-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
			  </svg>
			</button>
		</label>	
	</div>`
}

const noTodosAlert = `<div class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
  <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
    <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/>
  </svg>
  <p>There's no todos for now.</p>
</div>`


/*
window.onload = function(){
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log({ responseText: this.responseText });
      }
  };

  request.open('GET', 'http://localhost:9999/server.php');
  request.send();
}*/
