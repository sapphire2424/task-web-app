let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editingId = null;

renderTasks();

function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    if (text) {
        tasks.push({ id: Date.now(), text: text });
        saveAndRender();
        input.value = '';
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveAndRender();
}

function startEditing(id) {
    editingId = id;
    renderTasks();
}

function saveEdit(id) {
    const input = document.getElementById('editInput');
    const newText = input.value.trim();
    if (newText) {
        tasks = tasks.map(task => task.id === id ? { ...task, text: newText } : task);
        editingId = null;
        saveAndRender();
    }
}

function cancelEdit() {
    editingId = null;
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        if (editingId === task.id) {
            li.innerHTML = `
                <input type="text" id="editInput" class="edit-input" value="${task.text}" onkeypress="if(event.key==='Enter'){saveEdit(${task.id})}">
                <div class="task-actions">
                    <button onclick="saveEdit(${task.id})">save</button>
                    <button onclick="cancelEdit()">cancel</button>
                </div>
            `;
        } else {
            li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div class="task-actions">
                    <button onclick="startEditing(${task.id})">edit</button>
                    <button onclick="deleteTask(${task.id})">delete</button>
                </div>
            `;
        }
        list.appendChild(li);
    });
}

function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}