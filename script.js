let todos = [];
let wait = 3000;

const form = document.querySelector("form");
const table = document.querySelector("table");

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

async function fetchMotivationalQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error fetching quote:', error);
    return null;
  }
}

function showMotivationalQuotePopup(quote) {
  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.textContent = quote;


  document.body.appendChild(popup);

  setTimeout(() => {
    document.body.removeChild(popup);
  }, wait);
}

document.addEventListener('change', function(event) {
  const checkbox = event.target;
  if (checkbox.matches('input[type="checkbox"]') && checkbox.checked) {
    fetchMotivationalQuote().then((quote) => {
      if (quote) {
        showMotivationalQuotePopup(quote);
      }
    });
  }
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
            <button onclick="deleteTodo('${todo}')" class="fa-solid fa-trash-can"></button>
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
