let todos = [];

const form = document.querySelector("form");
const table = document.querySelector("table");
// const trashIcon = document.querySelector("fa-trash-can");
// const trashIcon ist ein Test

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const todo = document.querySelector("#todo").value.trim();
  if(todo == ""){
    alert("Bitte gebe eine ToDo ein!");
    return;
  }
  todos.push(todo);
  updateTable();
  document.querySelector("#todo").value = "";
});

function updateTable() {
  table.innerHTML = `
	    <tr>
	      <th>ToDo</th>
	      <th></th>
	    </tr>
	    ${todos
        .map(
          (x,i) => `
	      <tr>
	        <td>${i+1}. ${x}</td>
	        <td><button onclick="deleteTodo('${x}', ${i})" class="fa-solid fa-trash-can"></button></td>
          <td><button onclick="TodoDone(${i})" class="fa-solid fa-square-check"></button></td>
          </tr>`
        )
        .join("")}
	  `;
}

function deleteTodo(todo, i) {
  todos = todos.filter((t, index) => index !== i);
  updateTable();
}

function TodoDone(i){
  const todoElement = document.querySelector(`#todo-$(i)`);
  todoElement.style.textDecoration = "line-through";
}

// function TodoDone(todo, i){
//   const checkbox = ;
//   const TodoDone = text-decoration: "line-through";
//   if(i == ) 
// }
// Keine Ahnung wie man eine ToDo durchstreichen lässt, sobald man die Checkbox angeklickt hat
