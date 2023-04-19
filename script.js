let todos = [];

const form = document.querySelector("form");
const table = document.querySelector("table");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const todo = document.querySelector("#todo").value.trim();
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
          (todo) => `
	      <tr>
	        <td>${todo}</td>
	        <td><button onclick="deleteTodo('${todo}')">Delete</button></td>
	      </tr>`
        )
        .join("")}
	  `;
}

function deleteTodo(todo) {
  todos = todos.filter((t) => t !== todo);
  updateTable();
}
