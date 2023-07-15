var taskList = document.querySelector('ul');



var taskInput = document.querySelector('input');
taskInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    document.querySelector('button').click();
  }
});

var tasks = [];
var editingTaskIndex = -1;

function addTask(task, newName,) {
  var taskText = taskInput.value;

  if (taskText !== "") {
    if (editingTaskIndex === -1) {

      var apiUrl = 'https://localhost:44367/todos';

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: taskText,
          completed: false,
        })
       
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        tasks.push(data);
        renderTasks();
      })
      
      .catch(error => {
        console.log(error);
      });
    } else {
      console.log(tasks);

      var task = tasks.find(task => task.id === editingTaskIndex);
      console.log(task)
      if (!task.completed) {
        var apiUrl = 'https://localhost:44367/todos?id=';

        console.log(task);
        var newName = taskInput.value;
        console.log(newName);

        fetch(apiUrl + editingTaskIndex + '&newName=' + newName , {
          method: 'PUT',
          
        })
        
        .then(res => res.text())
        .then(res => {
          console.log(res);
          task.name = newName;
          console.log(newName)
          renderTasks();
        })
        .catch(err => {
          console.log(err);
        });
      } else {
        alert("Cant not edit.");
      }
    }

    taskInput.value = "";
    editingTaskIndex = -1;
  }
}




function loadTask() {
  var apiUrl = 'https://localhost:44367/todos';
   fetch(apiUrl, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
})
  .then(res => res.json())
  .then(data => {
   tasks = data
   renderTasks()
  })
  .catch(error => {
    console.log(error);
  });
}


document.querySelector('button').addEventListener("click", addTask);



function renderTasks() {
  taskList.innerHTML = "";
  console.log('renderTasks', tasks);
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
        taskItem.appendChild(editButton);

        taskList.appendChild(taskItem);
      });
    
}


function toggleTaskCompletion(taskId) {
  var task = tasks.find(item => item.id === taskId);
  
  var apiUrl = 'https://localhost:44367/todos?id=';
  var editingTaskIndex = task.id;
  var newName = taskInput.value;
  
  if (!newName) {
    newName = task.name;
  }

  fetch(apiUrl + editingTaskIndex + '&newName=' + newName + '&completed=' + !task.completed, {
    method: 'PUT',
  })
  .then(res => res.text())
  .then(res => {
    console.log(res);
    task.completed = !task.completed;
    renderTasks();
  })
  .catch(err => {
    console.log(err);
  });
}


function deleteTaskId(taskId) {
  var apiUrl = 'https://localhost:44367/todos?id=';

  fetch(apiUrl + taskId, {
    method: 'DELETE',
    
    
  })
    .then(res => res.text())
    .then(res => {
      console.log(res);

      tasks = tasks.filter(task => task.id !== taskId);
      console.log(tasks)
      renderTasks()
     
    })
    .catch(err => {
      console.log(err);
    });
}

function editTask(taskId) {
 var task = tasks.find(task => task.id === taskId);
 console.log(task)
   if (task !== null) {
    
    if(!tasks.completed){//nếu true thì k cho edit

      taskInput.value = task.name;
      editingTaskIndex = task.id;
      console.log(editingTaskIndex);
      completed = task.completed
      console.log(completed)
  
     
    }else{
      alert("đã completed")
    }
    
  }
}


loadTask();


