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
    checkNearDueTasks();
});

function addTaskToDOM(task) {
    const taskDiv = document.createElement('div');
    taskDiv.className = `task ${task.priority}`;
    
    if (task.status === 'pendente' && isDueToday(task.dueDate)) {
        taskDiv.classList.add('due-today');
    }

    if (task.status === 'pendente' && isNearDue(task.dueDate)) {
        taskDiv.classList.add('near-due');
    }

    if (task.status === 'encerrada') {
        taskDiv.classList.add('task-encerrada');
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
    taskDiv.scrollIntoView({ behavior: 'smooth' });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function isDueToday(dueDate) {
    const currentDate = new Date();
    const taskDate = new Date(dueDate);
    return taskDate.toDateString() === currentDate.toDateString();
}

function isNearDue(dueDate) {
    const currentDate = new Date();
    const taskDate = new Date(dueDate);
    const diffTime = taskDate - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 3;
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
    checkNearDueTasks();
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

function checkNearDueTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        if (task.status === 'pendente' && isNearDue(task.dueDate)) {
            showNotification(task);
        }
    });
}

function showNotification(task) {
    if (Notification.permission === 'granted') {
        const notification = new Notification('Tarefa Próxima do Vencimento', {
            body: `A tarefa "${task.title}" está próxima do vencimento.`,
        });
    }
}

if (Notification.permission !== 'granted') {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            checkNearDueTasks();
        }
    });
}

window.onload = loadTasks;
