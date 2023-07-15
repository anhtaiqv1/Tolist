var taskList = document.querySelector('ul');
var dropdowList = document.querySelector('select')

const config = {
  server : '.;Trusted_Connection=True',
  database : 'Tasks',
  user : '',
  password :'123456'
}

 app.use(express.json());




var taskInput = document.querySelector('input');
taskInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    document.querySelector('button').click();
  }
});


function taskDb(){
  var connectionString = configuration.GetConnectionString()
  
}
var tasks = [];
var editingTaskIndex = -1;

function loadTask() {
  var storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
}

function saveTask() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(task) {
 
    var taskText = taskInput.value;

  if (taskText !== "") {
    if (editingTaskIndex === -1) {
      let id = 1
      if(tasks.length > 0){
        id = tasks[tasks.length - 1]?.id +1
      }
      var newTask = { 
        name: taskText,
        id: id,
        completed: false
      };
      
      tasks.push(newTask);
        
    } else{
     var task = tasks[editingTaskIndex]

      if(!task.completed){
        tasks[editingTaskIndex].name = taskText;
        editingTaskIndex = -1;
      }else{
        alert("đã completed add")
      }
      
    }

    saveTask();
    renderTasks();
    taskInput.value = "";
  } 
}


document.querySelector('button').addEventListener("click", addTask);


function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function(task) {
    var taskItem = document.createElement("li");
    taskItem.innerText = task.name;

    var toggleButton = document.createElement("button");
    toggleButton.innerText = task.completed ? "Uncompleted" : "Completed";
    toggleButton.setAttribute("onclick", "toggleTaskCompletion(" + task.id + ")");
    
    taskItem.appendChild(toggleButton);
  
  
    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.setAttribute("onclick", "deleteTaskId(" + task.id + ")");
    taskItem.appendChild(deleteButton);

    var editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.setAttribute("onclick", "editTask(" + task.id + ")");
    // if (task.completed && editingTaskIndex == -1) {
    //   editButton.disabled = true; 
    // }
    taskItem.appendChild(editButton);

    taskList.appendChild(taskItem);
   
  });
}

function toggleTaskCompletion(taskId) {
  var task = tasks.find(item => item.id === taskId);
  if(task){
    task.completed = !task.completed
    saveTask()
    renderTasks()
  }
 
}

 function deleteTaskId(taskId){
  tasks = tasks.filter(item => item.id != taskId);
  saveTask();
  renderTasks();
 }


function editTask(taskId){
  var taskIndex = tasks.findIndex(task => task.id === taskId);
  if(taskIndex !== -1){
     var task = tasks[taskIndex]

     if(!task.completed){
      taskInput.value = task.name
      editingTaskIndex = taskIndex
      
     }else{
      alert("đã complete")
     }
   
  }
 
}
loadTask();
renderTasks();
console.log(tasks)


// const config = {
//   server: '.',
//   database: 'tasks',
//   user: 'tai',
//   password: '123456',
//   options: {
//     encrypt: true 
//   }
// };


// app.use(express.json());


// app.post('/api/tasks', async (req, res) => {
//   try {
//     const { name, completed } = req.body;
 
//     await sql.connect(config);

//     const query = `INSERT INTO Tasks (Name, Completed) VALUES (@name, @completed); SELECT SCOPE_IDENTITY() AS TaskId;`;

//     const result = await sql.query(query, {
//       name: name,
//       completed: completed
//     });

//     const taskId = result.recordset[0].TaskId;

//     res.status(201).json({ taskId: taskId });
//   } catch (error) {
//     console.error('Error adding task:', error);
//     res.status(500).json({ error: 'An error occurred while adding the task.' });
//   } finally {
   
//     sql.close();
//   }
// });


