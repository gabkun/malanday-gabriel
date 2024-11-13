function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task");
        return;
    }

    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
        ${taskInput.value}
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;
    
    taskList.appendChild(taskItem);
    taskInput.value = "";
}

function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
}