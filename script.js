const tableBody = document.getElementById("tableBody");
const url = "https://dummyjson.com/todos";
const searchInput = document.getElementById("searchText");
const searchButton = document.getElementById("search-btn");
const fetchInput = document.getElementById("fetch-data");
const fetchButton = document.getElementById("fetch-btn");
let todos = [];

const fetchTodos = () => {
  const limit = fetchInput.value;
  if(limit >= 255) alert('data not found')
    else{
  fetch(`${url}?limit=${limit}`)
    .then((response) => response.json())
    .then((data) => {
      todos = data.todos;
      displayTable(data.todos);
    })
    .catch((error) => {
      console.error("error fetching data", error);
    });
  }
};

fetchTodos();
const displayTable = (data) => {
  tableBody.innerHTML = "";

  data.forEach((todo) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${todo.id}</td>
    <td>${todo.userId}</td>
    <td>${todo.todo}</td>
    <td>${todo.completed}</td>
    <td><button class="delete-btn" data-id="${todo.id}">Delete</button></td>

    `;
    tableBody.appendChild(row);

    const deleteButton = row.querySelector(".delete-btn");
    deleteButton.addEventListener("click", () => {
      deleteTodo(todo.id);
    });
  });
};
searchButton.addEventListener("click", () => {
  const searchText = searchInput.value.toLowerCase();
  if (!searchText) {
    alert("put search item");
    return;
  }
  const filderData = todos.filter((todos) =>
    todos.todo.toLowerCase().includes(searchText)
  );

  if (filderData == 0) {
    alert("No data found");
  } else {
    displayTable(filderData);
  }
});

fetchButton.addEventListener("click", fetchTodos);

const deleteTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  displayTable(todos);
};
