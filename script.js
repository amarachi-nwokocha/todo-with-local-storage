let form = document.getElementById("input");
let addBtn = document.getElementById("addBtn")
let input = document.getElementById("inputField")
let todos = [];
let listItems = document.getElementById('tasklist')
console.log(listItems);
let delBtn = document.getElementsByClassName('DelBtn');
console.log(delBtn);
let checks = document.getElementsByClassName('check');
console.log(checks);
//add eventlistener 
//get the input.value
form.addEventListener('submit',(event) => {
    event.preventDefault();
    if (input.value !== " ") {
      let date = new Date(Date.now());
      let newTodo = {
        date: date.toLocaleDateString(),
        name : input.value,
        completed: false
      }
      
      todos.push(newTodo);
      addToLocalStorage(todos)
     
    }
    input.value =" "
})

// 
function addToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
  //the two parameters are the name i want it to be in the thing in local storage
  //and the second one is the array name  
  getFromLocalStorage()
}
function getFromLocalStorage(){
 let items = JSON.parse(localStorage.getItem('todos'));
if (items ) {
  console.log(items);
}
renderToDOM(items)
}

function renderToDOM(items) {
  //create elements
  listItems.innerHTML = '';
    items.forEach( (item) =>{
      const checked = item.completed ?  'checked': null;
      //create elements 
      let li = document.createElement('li');
      li.setAttribute('class', 'listItem');
      li.setAttribute('data-key', item.name);
      if (item.completed === true) {
        li.classList.add(checked)
      }
      li.innerHTML = `
      <i class="far fa-times-circle check"></i>
      <span> ${item.name} </span>
      <i class="fas fa-trash-alt DelBtn"></i>
      `
      listItems.appendChild(li)
    })
}
//toggle classes
function toggleTodo(name) {
 todos.forEach(todo =>{
  if (todo.name == name) {
    todo.completed = !todo.completed;  
  }
  addToLocalStorage(todos);
 })

}
// delete function 
function delFunc(name) {
  todos= todos.filter(todo =>{
    return todo.name != name
  });
  console.log(todos);
  addToLocalStorage(todos);
}
listItems.addEventListener('click', (e) =>{
   console.log(e.target.classList);
    if (e.target.classList.contains('fa-times-circle')) {
   toggleTodo(e.target.parentElement.getAttribute('data-key'));
   
    }
    if (e.target.classList.contains('DelBtn')) {
      delFunc(e.target.parentElement.getAttribute('data-key'))
    }

})

