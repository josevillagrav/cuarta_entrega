document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");

  // Array "tasks" utilizado para almacenar tareas y manipular con push y forEach

  let tasks = [];

  // Cargar tareas desde el almacenamiento al cargar la página
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    renderTasks();
  }

  // Uso de condicional y ciclo
  // DOM y detección de eventos en click para marcar tareas comoo completadas o no

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.textContent = task.name;

      // Botón para eliminar la tarea
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.addEventListener("click", () => {
        deleteTask(index); // Llamar a la función para eliminar la tarea
      });

      if (task.completed) {
        li.classList.add("completed");
      }

      li.appendChild(deleteButton);
      taskList.appendChild(li);
    });
  }

  // Cada tarea en la lista es un Objeto

  addTaskButton.addEventListener("click", () => {
    const taskName = taskInput.value.trim();
    if (taskName !== "") {
      tasks.push({ name: taskName, completed: false });
      renderTasks();
      saveTasks();
      taskInput.value = "";
    }
  });

  // Guardar tareas en el almacenamiento

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  // Función para eliminar tarea
  function deleteTask(index) {
    tasks.splice(index, 1); // Eliminar la tarea del array
    renderTasks(); // Renderizar la lista actualizada
    saveTasks(); // Guardar los cambios en el almacenamiento
  }
  // Llamada a fetchData() para obtener datos al cargar la página
  fetchData();
});

// Función fetchData() y API
function fetchData() {
  const apiUrl = "https://jsonplaceholder.typicode.com/todos";

  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("La respuesta de la red no es correcta");
      }
      return response.json();
    })
    .then((data) => {
      tasks = data;
      renderTasks();
      saveTasks();
    })
    .catch((error) => {
      console.error("Hubo un problema con la operación:", error);
    });
}
