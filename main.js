const tasks = [] ; // Arreglo con todas las tareas que agregemos
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;


const btnAdd = document.querySelector('#btnAdd');
const itTask = document.querySelector('#itTask');
const form = document.querySelector('#form');

form.addEventListener('submit', e => {
  e.preventDefault();

  if (itTask !== "") {
      const task = itTask.value;
      createTask(task);
      itTask.value = '';
      renderTask()
  }
  
})

function createTask(value) {
    const newTask = { // Creamos la nueva tarea
      id : new Date().getTime(),
      title: value,
      completed:false
    }
    tasks.unshift(newTask); // Agrega la tarea al principio del arreglo
}

function renderTask() {
    const taskContainer = document.querySelector('#tasks');
    const html = tasks.map( task => {
      return `
          <article class="task"> 
                <p class="completed"> 
                    ${task.completed ? `<span class="done">Done</span>`
                    :`<button class="start-btn" data-id="${task.id}">Start</button>`} 
                </p>
                <p class="title"> ${task.title}</p>
          </article>
      `;
    })
    taskContainer.innerHTML = html.join("") ;

}