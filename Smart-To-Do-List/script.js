const addbt =document.querySelector('#addBtn');
const input = document.querySelector('#taskInput');
const taskList = document.querySelector('#taskList');
const filtersc=document.querySelector('.filter-btn.complete');
const filtersp=document.querySelector('.filter-btn.pending');
const filersall=document.querySelector('.filter-btn.active');
addbt.addEventListener('click', () => {
    const taskText = input.value.trim();    
    if (taskText !== '') {
        const li = document.createElement('li');
        li.className = 'task';     
        li.innerHTML = `
            <span class="task-text">${taskText}</span>
                <div class="task-actions">
                    <button class="complete-btn">✔</button>
                    <button class="delete-btn">✖</button>
                    <button class="edit-btn">✎</button>
                </div>
        `;
        taskList.appendChild(li);
        input.value = '';
    }   
});
const completeButtons = document.querySelectorAll('.complete-btn');
taskList.addEventListener('click', (e) => {

    const taskItem = e.target.closest('.task');
    if (!taskItem) return;

    if (e.target.classList.contains('delete-btn')) {
        taskItem.remove();
    }

    else if (e.target.classList.contains('edit-btn')) {
        const taskText = taskItem.querySelector('.task-text');
        const newText = prompt('Edit Task:', taskText.textContent);
        if (newText && newText.trim() !== '') {
            taskText.textContent = newText.trim();
        }
    }

    else if (e.target.classList.contains('complete-btn')) {
        taskItem.classList.toggle('completed');
    }

});

filersall.addEventListener('click', () => {
    const tasks = document.querySelectorAll('.task');   
    tasks.forEach(task => {
        task.style.display = 'block';
    }
    );
});
filtersp.addEventListener('click', () => {
    const tasks = document.querySelectorAll('.task');   
    tasks.forEach(task => {
        if (!task.classList.contains('completed')) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
        if (filtersp.classList.contains('active')) {
            task.style.display = 'block';
        }
    });
});


filtersc.addEventListener('click', () => {
   const tasks = document.querySelectorAll('.task');
   tasks.forEach(task => {
       if (task.classList.contains('completed')) {
           task.style.display = 'block';
       } else {
           task.style.display = 'none';
       }
       if (filtersc.classList.contains('active')) {
           task.style.display = 'block';
       }


   });
});