let todos = JSON.parse(localStorage.getItem("todos")) || []; // Laden der gespeicherten Todos aus dem Local Storage oder Initialisierung als leeres Array
let wait = 3000; // Wartezeit fÃ¼r die Anzeige des Popups

const form = document.querySelector("form"); // Selektieren des Formulars
const table = document.querySelector("table"); // Selektieren der Tabelle

updateTable(); // Aktualisieren der Tabelle beim Laden der Seite

form.addEventListener("submit", (event) => { // HinzufÃ¼gen eines Event Listeners fÃ¼r das Absenden des Formulars
  event.preventDefault();
  const todoInput = document.querySelector("#todo"); // Selektieren des Eingabefelds fÃ¼r die ToDo
  const todo = todoInput.value.trim(); // Extrahieren des ToDo-Werts und Entfernen von Leerzeichen

  if (todo === "") { // ÃœberprÃ¼fen, ob eine ToDo eingegeben wurde
    alert("Bitte gebe eine ToDo ein!");
    return;
  }

  todos.push({ task: todo, completed: false }); // HinzufÃ¼gen der ToDo als Objekt mit Status "completed: false" zum Array
  updateTable(); // Aktualisieren der Tabelle
  saveTodosToStorage(); // Speichern der Todos im Local Storage
  todoInput.value = ""; // ZurÃ¼cksetzen des Eingabefelds
});

async function fetchMotivationalQuote() { // Funktion zum Abrufen eines motivierenden Zitats von einer API
  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error("Error fetching quote:", error);
    return null;
  }
}

function showMotivationalQuotePopup(quote) { // Funktion zum Anzeigen eines Popups mit dem motivierenden Zitat
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.textContent = quote;

  document.body.appendChild(popup);

  setTimeout(() => {
    document.body.removeChild(popup);
  }, wait);
}

document.addEventListener("change", function (event) { // HinzufÃ¼gen eines Event Listeners fÃ¼r Ã„nderungen im Dokument (z.B. Checkbox-Ã„nderungen)
  const checkbox = event.target;
  if (checkbox.matches('input[type="checkbox"]')) {
    const index = checkbox.dataset.index; // Abrufen des Index-Werts aus dem dataset der Checkbox
    toggleTodoStatus(index); // Aufrufen der Funktion zum Wechseln des Status der ToDo anhand des Index-Werts
  }
});

function toggleTodoStatus(index) { // Funktion zum Wechseln des Status der ToDo anhand des Index-Werts
  if (index !== undefined) {
    //const todoElement = document.querySelector(`#todo-${index}Â´)
    //if (todoElement.style.textDecoration === "line-through")
      //todoElement.style.textDecoration = "none";
      //}else{
      //todoElement.style.textDecoration = "line-through"
    todos[index].completed = !todos[index].completed; // Wechseln des "completed"-Status der ToDo 
    updateTable(); // Aktualisieren der Tabelle
    saveTodosToStorage(); // Speichern der Todos im Local Storage 
  }
}

function updateTable() { // Funktion zum Aktualisieren der Tabelle
  table.innerHTML = `
    <tr>
      <th>ToDo</th>
      <th></th>
    </tr>
    ${todos
      .map(
        (todo, index) => `
        <tr id="todo-${index}">
          <td>
            <input type="checkbox" id="todo-${index}" data-index="${index}" ${todo.completed ? "checked" : ""}>
            <label for="todo-${index}" ${todo.completed ? 'style="text-decoration: line-through;"' : ""}>${todo.task}</label>
          </td>
          <td>
            <button onclick="deleteTodo(${index})" class="fa-solid fa-trash-can"></button>
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

function deleteSelectedTodos() { // Funktion zum LÃ¶schen der ausgewÃ¤hlten ToDos
  const selectedTodos = Array.from(//todos.completed
    document.querySelectorAll("input[type='checkbox']:checked")
  ).map((checkbox) => checkbox.dataset.index); // Erstellen eines Arrays mit den Index-Werten der ausgewÃ¤hlten ToDos
  console.log(selectedTodos)

  for(let i = selectedTodos.length -1; i>=0; i--)
  { let index = selectedTodos[i];
      todos.splice(index, 1); // Entfernen der ausgewÃ¤hlten ToDos aus dem Array
    
  }

  updateTable(); // Aktualisieren der Tabelle
  saveTodosToStorage(); // Speichern der Todos im Local Storage
}

function deleteTodo(index) { // Funktion zum LÃ¶schen einer ToDo anhand des Index-Werts
  if (index !== undefined) {
    todos.splice(index, 1); // Entfernen der ToDo aus dem Array
    updateTable(); // Aktualisieren der Tabelle
    saveTodosToStorage(); // Speichern der Todos im Local Storage
  }
}

function saveTodosToStorage() { // Funktion zum Speichern der Todos im Local Storage
  localStorage.setItem("todos", JSON.stringify(todos));
}