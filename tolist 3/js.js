var taskList = document.querySelector('ul');

var taskInput = document.querySelector('input');
taskInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    document.querySelector('button').click();
  }
});

var tasks = [];
var editingTaskIndex = -10;

function loadTask() {
  var storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
}

function saveTask() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  var taskText = taskInput.value;
  console.log("🚀 ~ addTask ~ taskText:", taskText)
  if (taskText !== "") {
    if (editingTaskIndex === -10) {
      let id = 1
      if(tasks.length > 0){
        id = tasks[tasks.length - 1]?.id +1
      }
      var newTask = { 
        name: taskText ,
        id: id 
      };
      tasks.push(newTask);
        
    } else {
    
    
    }
    saveTask();
    renderTasks();
    taskInput.value = "";
  } 
}


document.querySelector('button').addEventListener("click", addTask);

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function(task, index) {
    var taskItem = document.createElement("li");
    taskItem.innerText = task.name;

    var taskCompeleted = document.createElement("button")
    taskCompeleted.innerText = "Completed"
    taskCompeleted.setAttribute("onclick","Completed(" + task.id +  ")")
    taskItem.appendChild(taskCompeleted);

    var taskUnCompeleted = document.createElement("button")
    taskUnCompeleted.innerText = "Un Completed"
    taskUnCompeleted.setAttribute("onclick","Completed(" + task.id +  ")")
    taskItem.appendChild(taskUnCompeleted)

    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.setAttribute("onclick", "deleteTaskId(" + task.id + ")");
    taskItem.appendChild(deleteButton);

    var editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.setAttribute("onclick", "editTask(" + task.id + ")");
    taskItem.appendChild(editButton);

    taskItem.setAttribute("onclick", "UnCompleted(this)");
    taskList.appendChild(taskItem);
  });
}

function CompletedStatus(taskItem) {
  taskItem.classList.toggle("completed");
 
}
function Completed(taskId){

}

function UnCompleted(taskId){
  
}

 function deleteTaskId(taskId){
  tasks = tasks.filter(item => item.id != taskId)
  saveTask();
  renderTasks()
 }

function editTask(taskId) {//sửa item name của object task  bằng cách lấy index của item name
  var taskIndex = tasks.findIndex(task => task.id === taskId);// tìm tất cả index thoả mãn điểu kiện id 
 
   if (taskIndex !== -1) {
    // gán giá trị của task được tìm thấy trong mảng `tasks` vào biến `task`, để có thể truy cập và chỉnh sửa thông tin của task này.
    var task = tasks[taskIndex];
    //gán giá trị của thuộc tính `name` của task vào trường input (được giả định là biến `taskInput`), để người dùng có thể xem tên hiện tại của task đang được chỉnh sửa.
    taskInput.value = task.name;
    //gán giá trị của `taskIndex` vào biến `editingTaskIndex`, biến này có thể được sử dụng sau đó để cập nhật lại task trong mảng `tasks` sau khi hoàn thành chỉnh sửa.
    editingTaskIndex = taskIndex;
  }
}

loadTask();
renderTasks();
console.log(tasks);
