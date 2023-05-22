let todos = [];

const form = document.querySelector("form");
const table = document.querySelector("table");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const todo = document.querySelector("#todo").value.trim();
  if(todo == ""){
    alert("");
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
        (todo) => `
        <tr>
          <td>
            <input type="checkbox" id="${todo}" onchange="toggleTodoStatus('${todo}')" />
            <label for="${todo}">${todo}</label>
          </td>
          <td>
            <button onclick="deleteTodo('${todo}')">Delete</button>
          </td>
        </tr>
      `
      )
      .join("")}
    <tr>
      <td colspan="2" style="text-align: center;">
        <button onclick="deleteSelectedTodos()">Delete Selected</button>
      </td>
    </tr>
  `;
}

function deleteSelectedTodos() {
  const selectedTodos = Array.from(document.querySelectorAll("input[type='checkbox']:checked"))
    .map((checkbox) => checkbox.id);
  
  selectedTodos.forEach((todo) => {
    const index = todos.findIndex((t) => t === todo);
    if (index !== -1) {
      todos.splice(index, 1);
    }
  });
  
  updateTable();
}
function deleteTodo(todo) {
  const index = todos.findIndex((t) => t === todo);
  if (index !== -1) {
    todos.splice(index, 1);
    updateTable();
  }
}