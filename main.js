const tasks = [] ; // Arreglo con todas las tareas que agregemos
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;


const btnAdd = document.querySelector('#btnAdd');
const itTask = document.querySelector('#itTask');
const form = document.querySelector('#form');
const taskName = document.querySelector('#time #taskName');

renderTime();
renderTask();


form.addEventListener('submit', e => {
  e.preventDefault();

  if (itTask !== "") {
      createTask(itTask.value);
      itTask.value = '';
      renderTask();
  }
  
})

function createTask(value) {
    const newTask = { // Creamos la nueva tarea
      id: (Math.random() * 100).toString(36).slice(2) ,
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
    taskContainer.innerHTML = html.join("");

    const startBtns = document.querySelectorAll('.task .start-btn');
    startBtns.forEach( btn => {
      btn.addEventListener('click', e => {
        
          if (!timer) {
              const id = btn.getAttribute('data-id');
              startBtnHandler(id);
              btn.textContent = 'In progress...';
          }

      })
    })
}


function startBtnHandler(id) {
    time = 25 * 60 ;
    current = id;
    const taskIndex = tasks.findIndex( (task) => task.id === id);
    
    taskName.textContent = tasks[taskIndex].title;
    
    timer = setInterval(() => {
        timeHandler(id);
    }, 1000);
}

function timeHandler(id) {
  time--;
  renderTime();

  if (time === 0) {
    clearInterval(timer);
    markCompleted(id);
    timer = null;
    renderTask();
    startBreak();
  }
}

function renderTime(){
  const timeConteiner = document.querySelector('#time #value');
  const minutes = parseInt(time / 60);
  const seconds = parseInt(time % 60);

  timeConteiner.textContent = `${minutes < 10 ? '0' : ''}${minutes} : ${seconds < 10 ? '0' : '' }${seconds}`;
}

function startBreak() {
  time = 5 * 60;
  taskName.textContent = "Break";
  timerBreak = setInterval(() => {
    timerBreakHandler();
  }, 1000);
}
function timerBreakHandler() {
  time--;
  renderTime();

  if (time === 0) {
    clearInterval(timerBreak);
    current = null;
    timerBreak = null;
    taskName.textContent = '';
    renderTask();
  }

}

function markCompleted(id) {
  const taskIndex = tasks.findIndex( (task) => task.id === id);
  tasks[taskIndex].completed = true;
}