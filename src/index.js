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

//let isEditable = false;
//get current date
n =  new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
var t = weekday[n.getDay()];
document.getElementById("date").innerHTML = t + ' ' + m + "/" + d + "/" + y;
// let isDone = false;
// todo = [todo1, todo2, todo3 ]
let todos = JSON.parse(localStorage.getItem("todos")) || [];
render();
// todo1 = {
//   id: 'hadfkjhdjksf',
//   title: 'my todo',
//   isEditable: true,
//   isDone: false
// }

// todo2 = {
//   id: 'sufhdkgjh',
//   title: 'my todo',
//   isEditable: true,
//   isDone: false
// }

// todo3 = {
//   id: 'hetheht',
//   title: 'my todo',
//   isEditable: true,
//   isDone: false
// }



//template, function render
// const render = () => {
//   const template = `<li class="todoInput"><p contenteditable=${isEditable}>${todoInput.value}</p><span class='delete'>[X]</span></li>`;
// todoList.innerHTML += template;
// };

// FUNCTION render
function render() {
  // we rerender all out list and items
  // todo so, we need to clear all our items first
  clearElements();

  todos.forEach((todo) => {
    // if isDone=true, icontenteditable = false
    // if isDone=false, icontenteditable = true
    const template = `
    <li class='${todo.isDone ? "lineThrough" : ""}' data-id=${todo.id}>
<input type='checkbox' ${todo.isDone ? "checked" : null} />
      <p contenteditable='${!todo.isDone}'>
        ${todo.title}
        </p>
            <button class="delete">delete</button>
      </li>
    `;
    // fancier way to append element at the end of the list
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML
    todoList.insertAdjacentHTML("beforeend", template);
  });
};
//END

//FUNCTION newElement
const addNewTodo = (event) => {
  //if missing input
  if(todoInput.value === ""){
    return null};
//adding ID to newElement
const newTodo = {
    id: (Date.now() + Math.random()).toString(),
    title: todoInput.value,
  //  isEditable: true,
    isDone: false
  };
//add todo to todo array
  todos.push(newTodo);
  save();
  render();
  };
//END

// Click Event listener newElement
addButton.addEventListener("click", (event) => {
  event.preventDefault();
  addNewTodo();
  todoInput.value = "";
});


//FUNCTION deleteItem
const deleteElement = (clickedItem) => {
  const clickedItemId = clickedItem.parentElement.dataset.id;
  // const currTodo = todos.find((todo) => clickedItemId === todo.id);
  var newTodos = todos.filter((todo, index) => {
    return todo.id !== clickedItemId;
  });
  todos = newTodos;
  save();
  render();
//todoList.removeChild(clickedItem.parentElement);
};
//END

// remove all items from todos
// render() or listEL.innerHTML = "";
clearButton.onclick = () => {
  while (todos.length > 0) {
    todos.pop();
  };
  // clearElements();
  todos = [];
  save();
  render();
};

//FUNCTION clear all
function clearElements() {
  todoList.innerHTML = "";
};

// OR
// const removeLi = (event) => {
//    while (todoList.hasChildNodes()) {
//      todoList.removeChild(todoList.firstChild);
//    }
//  };
//
// clearButton.addEventListener("click", removeLi);


//FUNCTION edit when clicking on to-do
todoList.addEventListener("click", (event) => {
  const clickedItem = event.target;
  if (clickedItem.classList.contains("delete")) {
    deleteElement(clickedItem);
}
  // if I click on text to edit:
  if (clickedItem.tagName.toLowerCase() === "p") {
    clickedItem.onkeydown = (event) => {
      // Save on return to prevent default behavious
      if (event.key === "Enter") {
        event.preventDefault(); // prevents line breaks
        const newText = clickedItem.textContent;

        // if the new text I write is less then 2 char
        // don't modify it
        if (clickedItem.textContent.trim().length < 2) {
          return alert("To-do item cannot be empty or less than two characters.");
        };

        // find data-id from clicked html item
        const clickedItemId = clickedItem.parentElement.dataset.id;
        // find current todo obj based on id
        const currTodo = todos.find((todo) => clickedItemId === todo.id);
        // update clicked todo title with edited text
        currTodo.title = newText;
        // update isEditable property for our curent todo Item
        // contenteditable=false
        //currTodo.isEditable = false;
        save();
        render();
      }
    };
  };
  // LISTEN TO CLICK ON INPUT
  if (clickedItem.tagName.toLowerCase() === "input") {
    // WARNING: This is just guideline, doesn't mean it will work out of the box
    // fill in, try it out, check for errors on the console, console.log, ...
    const clickedItemId = clickedItem.parentElement.dataset.id;
    const currTodo = todos.find((todo) => clickedItemId === todo.id);
    if (clickedItem.checked) {
      //   todo isDone set to true
      currTodo.isDone = true;
      //   todo isEditable set to false
      //   re render()
      save();
      render();
    } else {
      //   todo isDone set to false
      currTodo.isDone = false;
      save();
      render();
    }
  }
});

//FUNCTION save to local localStorage
function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// FUNCTION init
// function init() {
//   render();
// }

//FUNCTION nav bar
let burger = document.getElementById('burger'),
	 nav    = document.getElementById('main-nav'),
	 slowmo = document.getElementById('slowmo');

burger.addEventListener('click', function(e){
	this.classList.toggle('is-open');
	nav.classList.toggle('is-open');
});

slowmo.addEventListener('click', function(e){
	this.classList.toggle('is-slowmo');
});

/* Onload demo - dirty timeout */
let clickEvent = new Event('click');

window.addEventListener('load', function(e) {
	slowmo.dispatchEvent(clickEvent);
	burger.dispatchEvent(clickEvent);

	setTimeout(function(){
		burger.dispatchEvent(clickEvent);

		setTimeout(function(){
			slowmo.dispatchEvent(clickEvent);
		}, 3500);
	}, 5500);
});

  //function filterTodo
 //  function filterTodo() {
 //   //xx
 // };


 // const isDone = () => {
 //      return todoInput.style.textDecoration='line-through'
 // };


// LINETHROUGH BY ADDING CLASS
 // const checkedItems = ({target}) => {
 //   if(target.matches("input[type=checkbox]")){
 //     target.closest("li").classList.toggle("lineThrough", target.checked);
 //   }
 // };
 //
 // todoList.addEventListener("change", checkedItems, false);
// END


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
// HTML
// add contenteditable
// add checkbox input with isDone
// add data-id with id from todo
// render the temp;ate based on todos array items

// EDIT
// listen to p tab event
// listen to onkeydown 'ENTER'
// if modified text is smaller the 2 chars, return
// update title and isEditable property of the currentTodo
// re-render

// DATA STRUCTURE
// create an array for contain all our todos
// make each todo an obj with id, title, isEditable, isDone properties
// push new todo to array

// Still To be done:
// remove todo from array
// clear all todo from todos array

// IS DONE:
// add class to the li based on if isDone or not.
// if isDone: gray out or strike out your todo
// if isDone: update todo.isDone and be sure to re-render it with checkbox checked
// 1_ while listening to the click on your ul list, check if the clickedItem.toLowerCase() === 'input
// 2_ grab the clickedItem DOM element (i.e. clickedItem.parentElement)
// 3_ grab the clickedItemId (check your edit function! We need to do exactly the same!)
// 4_ find the todo.id that has same id of clickedItemId (check your edit function! We need to do exactly the same!)
// 5_ check if the clickedItem ischecked (https://www.w3schools.com/jsref/prop_checkbox_checked.asp)
// 4_ if clickedItem is checked, assign todo.isDone === true and todo.isEditable === false
// 5_ if clickedItem is not checked, assign todo.isDone === false
// 6_ don't forget to re render() your list!
// 7_ add class to the li based on if isDone or not: gray out or strike out your todo


// MORE:
// FILTER:
// add 2 button: completed and active
// when click on completed: show just todo with isDone === true
// when click on active: show just todo with isDone === false
