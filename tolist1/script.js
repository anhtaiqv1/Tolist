var taskList = document.querySelector('ul');

var taskInput = document.querySelector('input');
taskInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    document.querySelector('button').click();
  }
});

var tasks = []
var editingTaskIndex = -1;

// function generateUniqueId() {
//   var TaskId = 1;
//   while (tasks.some(task => task.id === TaskId)) {// kiểm tra task. id có bằng taskid đã có hay không nếu bằng thì +1 // some trả về true hoặc false
//     TaskId ++;
//   }
//   return TaskId;
// } 

function loadTask(){
  var storTasks = localStorage.getItem('tasks')
  if(storTasks){
    tasks = JSON.parse(storTasks)
  }
}

function saveTask(){
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

// Dùng để thêm 1 việc mà người dùng mong muốn .và kiểm tra tasktext có rỗng hay không . 
// Nếu là công việc mới ngươig dùng nhập vào mà k phải chỉnh sửa thì thêm vào màng tasks
// . Nếu đó là công việc đã được chỉnh sửa, nó sẽ cập nhật công việc hiện có tại chỉ mục editingTaskIndex đã xác định. 
// sau đó thực hiện việc lưu trữ và hiển thị lại danh sách 
function addTask() {
  
  var taskText = taskInput.value;

  if (taskText !== "") {
    if (editingTaskIndex === -1) {
      let id = 1
      if(tasks.length > 0){
        id = tasks[tasks.length - 1]?.id +1 // tasks[tasks.length - 1] lấy item cuối của mảng tasks 
        // và tasks[tasks.length - 1]?.id dùng để check tasks[tasks.length - 1] có tồn tại hay ko nếu tồn tại thì trỏ đến trường id để lấy
       //( lấy phần tử cuối rồi cộng thêm 1)
      }
      var newTask = { 
        name: taskText ,
        id: id 
      };
      tasks.push(newTask);
     
     console.log("🚀 ~ file: script.js:49 ~ addTask ~ tasks:", tasks)
    } else {
      tasks[editingTaskIndex].name = taskText;
      editingTaskIndex = -1;
    }
    saveTask();
    renderTasks();
    taskInput.value = "";
  }
}


document.querySelector('button').addEventListener("click", addTask)

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function(taskText, index) {
    
    var taskItem = document.createElement("li");
    taskItem.innerText = taskText.name;
  
    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.setAttribute("onclick", "deleteTask(this)");
    taskItem.appendChild(deleteButton);

    var editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.setAttribute("onclick", "editTask(this, " + index + ")");
    taskItem.appendChild(editButton);

    taskItem.setAttribute("onclick", "toggleTaskStatus(this)");
    taskList.appendChild(taskItem);
  });
}

function toggleTaskStatus(taskItem) {
  taskItem.classList.toggle("completed");
  saveTask();

}

function deleteTask(deleteButton) {
  var taskItem = deleteButton.parentNode;
  var taskIndex = Array.from(taskItem.parentNode.children).indexOf(taskItem);
  tasks.splice(taskIndex, 1);
  saveTask();
  renderTasks();
}

function editTask(editButton, index) {
  var taskItem = editButton.parentNode;
  taskInput.value = tasks[index].name;
  editingTaskIndex = index;
  saveTask();
}

loadTask();
renderTasks();
console.log(tasks);



