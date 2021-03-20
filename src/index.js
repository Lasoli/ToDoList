// GOAL:
// Create multilple item from input field and display them in a list

// 1_ create new todo on submit
//  1a: grab value from text input: const inputValue = document.querySelector('#InputText).value
//  1b: listen to submit event and addNewTodo: form.addEventListener('submit', addNewTodo(inputValue))
//  1c: clear input value: inputValue = ''
//  1d: prevent form to submit by default: event.preventDefault();

// 2_ Add new todo to ul
// 2a: create addNewTodo function: const addNewTodo = function() { ... }
// 2b: grab ul element: const listEl = getElementbyId('myTasks)
// 2c: create new todo template: const template = `<li class="todo-item">${inputValue}</li>`
// 3c: add template to ul: listEl.innerHTML += template

//Selectors
//const clear = document.querySelector(".clear");
const todoInput = document.querySelector('#myInput');
const addButton = document.querySelector('.addBtn');
const clearButton = document.querySelector('.clearBtn');
const todoList = document.querySelector('#myUL');
//const filterOption = document.querySelector('.filter_todo');
let isEditable = false;

//get current date
// const d = new Date();
// const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// document.querySelector("#date").innerHTML = days[d.getDay()+','+d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()];
//

//template
const render = () => {
  const template = `<li class="todoInput"><p contenteditable=${isEditable}>${todoInput.value}</p><span class='delete'>[X]</span></li>`;
todoList.innerHTML += template;
};


//function newElement
const newElement = (event) => {
  //if missing input
  if(todoInput.value === ""){
    return null};
  render();
  };


// Event listeners
addButton.addEventListener("click", (event) => {
  event.preventDefault();
  newElement();
  todoInput.value = "";
});

//function removeLi
const removeLi = (event) => {
   while (todoList.hasChildNodes()) {
     todoList.removeChild(todoList.firstChild);
   }
 };

clearButton.addEventListener("click", removeLi);


//function deleteItem
const deleteElement = (targetItem) => {
  todoList.removeChild(targetItem.parentElement);
};

todoList.addEventListener("click", (event) => {
  const clickedEl = event.target;
  if (clickedEl.classList.contains("delete")) {
    deleteElement(clickedEl);
}});


  //function editTask
  const editTask = (clickedEl) => {
    isEditable = true;
    render();
  };

  //function filterTodo
 //  function filterTodo() {
 //   //xx
 // };



 /*
   function newElement() {
    const item = document.querySelector("#myInput").value;
    const text = document.createTextNode(item);
    const newItem = document.createElement("li");
    newItem.appendChild(text);
    document.getElementById("myUL").appendChild(newItem);
}
//todo LI
 // const newTodo = document.createElement('li');
 // newTodo.innerText = myInput.value;
 // newTodo.classList.add('todo_item');
 // todoDiv.appendChild(newTodo);

*/

// 1_ Delete
// Add html element "delete" to the li template
// Listen to the click event on the delete element
// check if the clicked item is the delete element: https://codetogo.io/how-to-check-if-element-has-class-in-javascript/
// delete item:
// listEl.removeChild() // https://www.w3schools.com/jsref/met_node_removechild.asp
// find parent element https://www.w3schools.com/jsref/prop_node_parentelement.asp

  // check if the clickedEl contain the delete element
  // if(event.target === #deleteItem) {}
  // https://codetogo.io/how-to-check-if-element-has-class-in-javascript/
  // if is the delete element, then call the deleteElement()
  // check/uncheck out item

  // function deleteElement
  // remove targetItem from listEl
  // listEl.removeChild() // https://www.w3schools.com/jsref/met_node_removechild.asp
  // find parent element https://www.w3schools.com/jsref/prop_node_parentelement.asp


// 2_ clear all button
// Add a html element "clear all" to our todo header
// Listen to the click event of clear all element
// clearAll() ->
   // 1_ remove all li element on your document
   // 2_ clear out the content of you ul list
   // As long as <ul> has a child node, remove it


// 3_ Edit Item
