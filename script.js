var tasks = [];
tasks = JSON.parse(localStorage.getItem("allTasks"));
tasks = tasks == null ? [] : tasks;
const render = (data) => {
  const element = document.getElementById("content");
  element.innerHTML = "";
  data?.map((val, key) => {
    element.innerHTML += `
        <div class="card border-0 shadow-sm mt-3">
            <div class="card-body">
                <h4 class="text-capitalize">${val.todo}</h4>
                <button class="btn" onclick ='edit(${key})'>Edit <i class="fa-sharp fa-solid fa-pen-to-square"></i></button>
                <button class="btn" onclick ='trash(${key})'>Delete <i class="fa-solid fa-trash"></i></button>
                <span class="badge float-end  ${
                  val.status == "pending"
                    ? "bg-danger"
                    : val.status == "in-progress"
                    ? "bg-warning"
                    : "bg-success"
                }">${val.status}</span>
            </div>
        </div>
        `;
  });
  localStorage.setItem("allTasks", JSON.stringify(data));
};

render(tasks);

const addModal = new bootstrap.Modal(document.getElementById("new-task"));
const editModal = new bootstrap.Modal(document.getElementById("edit-task"));

//create
document.getElementById("addForm").addEventListener("submit", (e) => {
  e.preventDefault();
  let todo = document.getElementById("addTask").value;
  tasks.push({ todo: todo, status: "pending" });
  render(tasks);
  addModal.hide();
});

console.log(tasks);

//edit
const edit = (id) => {
  editModal.show();
  document.getElementById("editTask").value = tasks[id].todo;
  document.getElementById("editStatus").value = tasks[id].status;
  document.getElementById("taskId").value = id;
};

//Save
document.getElementById("editForm").addEventListener("submit", (e) => {
  e.preventDefault();
  let todo = document.getElementById("editTask").value;
  let status = document.getElementById("editStatus").value;
  let id = document.getElementById("taskId").value;
  tasks[id].todo = todo;
  tasks[id].status = status;
  render(tasks);
  editModal.hide();
});

//Delete

const trash = (id) => {
  if (confirm("Are you sure you ant to delete task?")) {
    tasks.splice(id, 1);
    render(tasks);
  }
};
