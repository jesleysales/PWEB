document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due-date').value;
    const priority = document.getElementById('priority').value;
    const status = document.getElementById('status').value;
    const area = document.getElementById('area').value;
    
    const task = {
        title,
        description,
        dueDate,
        priority,
        status,
        area
    };
    
    addTaskToDOM(task);
    saveTask(task);
    this.reset();
});

function addTaskToDOM(task) {
    const taskDiv = document.createElement('div');
    taskDiv.className = `task ${task.priority}`;
    
    if (task.status === 'pendente' && isDueToday(task.dueDate)) {
        taskDiv.classList.add('due-today');
    }
    
    taskDiv.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Data de Vencimento: ${formatDate(task.dueDate)}</p>
        <p>Prioridade: ${task.priority}</p>
        <p>Status: ${task.status}</p>
        <p>Área: ${task.area}</p>
        <button onclick="removeTask(this)">Remover</button>
        <button onclick="editTask(this)">Editar</button>
    `;
    
    document.getElementById('tasks').appendChild(taskDiv);
}

function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

function isDueToday(dueDate) {
    const currentDate = new Date();
    const taskDate = new Date(dueDate);
    
    return taskDate.toDateString() === currentDate.toDateString();
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

function removeTask(button) {
    const taskDiv = button.parentElement;
    const title = taskDiv.querySelector('h3').innerText;
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.title !== title);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    taskDiv.remove();
}

function editTask(button) {
    const taskDiv = button.parentElement;
    const title = taskDiv.querySelector('h3').innerText;
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.title === title);
    
    document.getElementById('title').value = task.title;
    document.getElementById('description').value = task.description;
    document.getElementById('due-date').value = task.dueDate;
    document.getElementById('priority').value = task.priority;
    document.getElementById('status').value = task.status;
    document.getElementById('area').value = task.area;
    
    removeTask(button);
}

window.onload = loadTasks;
