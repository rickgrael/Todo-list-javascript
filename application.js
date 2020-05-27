//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const selector = document.querySelector(".filter-todo");

//Event Listeners
todoButton.addEventListener("click", addTodo);
selector.addEventListener('click', filterItens);
//Functions
getTodos();

function addTodo(event) {
    event.preventDefault();
    if (todoInput.value == "") {
        alert('Coloque um todo válido');
        return;
    }
    //Creating div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Creating item
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Storing Todo
    saveToLocalStorage(todoInput.value);
    //CHECK MARK BUTTON
    const completeButton = document.createElement("button");
    completeButton.innerHTML = "<i class='fas fa-check'></i>";
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    completeButton.addEventListener("click", Done);
    //CHECK TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    trashButton.addEventListener("click", deleteItem);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    //CLEAR TODO INPUT
    todoInput.value = "";
}

function Done(event) {
    let father = this.parentNode;
    father.classList.toggle("completed");
    console.log(father.innerText)
    if (father.classList.contains("completed")) {
        console.log("1")
        saveStateToLocalStorage(father.innerText)
    }
    else{
        deleteStateFromStorage(father.innerText);
    }
    filterItens("reload");
}

function deleteItem(event) {
    let father = this.parentNode;
    let grandFather = father.parentNode;
    father.classList.add("removed");
    removeTodo(father);
    father.addEventListener('transitionend', () => {
        grandFather.removeChild(father);
    })

}

function filterItens(e) {
    const todos = todoList.childNodes;
    todos.forEach(todo => {
        if (todo.style !== undefined) {
            switch (selector.value) {
                case "all":
                    todo.style.display = 'flex';
                    break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (!todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
            }
        }

    })
}

function saveToLocalStorage(todo) {
    let todos;

    if (localStorage.getItem("todos") == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(todo => {
        //Creating div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Creating item
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        checkState(todo,todoDiv);
        //CHECK MARK BUTTON
        const completeButton = document.createElement("button");
        completeButton.innerHTML = "<i class='fas fa-check'></i>";
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);
        completeButton.addEventListener("click", Done);
        //CHECK TRASH BUTTON
        const trashButton = document.createElement("button");
        trashButton.innerHTML = "<i class='fas fa-trash'></i>";
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        trashButton.addEventListener("click", deleteItem);
        //APPEND TO LIST
        todoList.appendChild(todoDiv);
    })


}

function removeTodo(todo) {
    let todos;
    if (localStorage.getItem("todos") == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem("todos", JSON.stringify(todos))
}

function saveStateToLocalStorage(todo){
    let states;
    if (localStorage.getItem("states") === null){
        states=[];
    }else{
        states = JSON.parse(localStorage.getItem('states'));
    }

    states.push(todo);
    localStorage.setItem("states",JSON.stringify(states));
}
function checkState(todo,div){
    let states = JSON.parse(localStorage.getItem("states"));
    if(states === null){
        return;
    }
    states.forEach(item=>{
        if(item===todo){
            div.classList.toggle("completed");
        }
    })
}

function deleteStateFromStorage(todo){
    let states;
    if (localStorage.getItem("states") === null){
        states=[];
    }else{
        states = JSON.parse(localStorage.getItem('states'));
    }
    let index = states.indexOf(todo);
    states.splice(index,1);
    localStorage.setItem("states",JSON.stringify(states));
}