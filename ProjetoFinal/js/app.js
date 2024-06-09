document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due-date').value;
    const priority = document.getElementById('priority').value;
    const status = document.getElementById('status').value;
    
    const task = {
        title,
        description,
        dueDate,
        priority,
        status
    };
    
    addTaskToDOM(task);
    saveTask(task);
    this.reset();
});

function addTaskToDOM(task) {
    const taskDiv = document.createElement('div');
    taskDiv.className = `task ${task.priority}`;
    taskDiv.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Data de Vencimento: ${task.dueDate}</p>
        <p>Prioridade: ${task.priority}</p>
        <p>Status: ${task.status}</p>
        <button onclick="removeTask(this)">Remover</button>
    `;
    
    document.getElementById('tasks').appendChild(taskDiv);
}

function removeTask(button) {
    button.parentElement.remove();
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

window.onload = loadTasks;
