// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(event) {
    // Prevent form from submitting
    event.preventDefault();

    // TodoDIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);




    // PFFF! ADD TODO TO LOCAL STORAGE 
    // ajouter dans un array et chaque fois qu'elle est modifiée l'enregister dans le le local storage
    // récupère cet array et modifie le array
    //saveLocalTodos(todoInput.value);




    // CHECK MARK BUTTON ===> We can use both: .createElement() or innerHTML()
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"> </i>';
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);

    // CHECK trash BUTTON ===> We can use both: .createElement() or innerHTML()
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    console.log({todoDiv});
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    

    //Clear TO DO INPUT VALUE
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;

    //DELETE TO DO
    //if you have class="a b c", then .classList[0] is "a", .classList[1] is "b", and .classList[2] is "c".
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        //todo.remove();
        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    }

    //CHECK MARK
    if(item.classList[0] === 'completed-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}


function filterTodo(e) {
    const todos = todoList.childNodes;
    console.log({todos, todoList})
    todos.forEach(function (todo)
    {
        if (todo.classList === undefined)
        {
            return;
        }

        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            
            case "completed":
                if(todo.classList.contains('completed')){
                   todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}


function saveLocalTodos(todo){
    //CHECK -- DO I ALREADY HAVE THINGS HERE?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todo = [];
    } else {
        todos: JSON.parse(localStorage.getItem('todos'));  
    }
    todos.push(todo);
    localStorage.setItems('todos', JSON.stringify(todos));
}


//PFFF! 



function getTodos()
{
    let todos;

      //CHECK -- DO I ALREADY HAVE THINGS HERE?
      if (localStorage.getItem('todos') === null) {
          todo = [];
      } else {
          todos: JSON.parse(localStorage.getItem('todos'));  
      }
    
    todos.forEach(function (todo)
    {
            // TodoDIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);

    // CHECK MARK BUTTON ===> We can use both: .createElement() or innerHTML()
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"> </i>';
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);

    // CHECK trash BUTTON ===> We can use both: .createElement() or innerHTML()
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    })

}