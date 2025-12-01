const task = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addTaskBtn");
const clearBtn = document.querySelector("#ClearTaskBtn");
const listDisplay = document.querySelector("#list");

addBtn.addEventListener("click", ()=>{
    if (!task.value.trim()) {
      return;
    }
    const li = document.createElement("li");
    li.innerHTML = `<span>${task.value.trim()}</span>`;

    const delBtn = document.createElement("button");
    delBtn.textContent = "DEL";
    delBtn.addEventListener("click",()=>{
      li.remove(); 
      saveTasks();
    });

    

    li.addEventListener("click",()=>{
      li.classList.toggle("done");
      saveTasks();
    });

    li.appendChild(delBtn);
    listDisplay.appendChild(li);
    task.value = "";

const span = li.querySelector("span");

span.addEventListener("dblclick", () => {
  span.contentEditable = true;
  console.log("edit");
  span.focus();
});

span.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    span.blur(); 
    span.contentEditable = false;
    saveTasks(); 
  }
});
    saveTasks();
});

document.querySelectorAll("#filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    loadTasks(filter);
  });
});


function saveTasks(){
  const taskData = [];
  document.querySelectorAll("li").forEach(li=> {
    console.log(li);
    taskData.push({
      text : li.firstChild.textContent.trim(),
      done : li.classList.contains("done")
    });
  });
  localStorage.setItem("Data", JSON.stringify(taskData));
}

// function loadTasks(){
//     const taskdata = localStorage.getItem("Data");
//     const data = JSON.parse(taskdata);
//     console.log("loaded", taskdata);
//     if (!taskdata) {
//       return;
//     }


//     data.forEach(item => {
//     const li = document.createElement("li");
//     li.innerHTML = `<span>${item.text}</span>`
//     if (item.done) li.classList.add("done");
  
//     const delBtn = document.createElement("button");
//     delBtn.textContent = "DEL";
//     delBtn.addEventListener("click",()=>{
//       li.remove(); 
//       saveTasks();
//     });

//     li.addEventListener("click",()=>{
//       li.classList.toggle("done");
//       saveTasks();
//     });

//     li.appendChild(delBtn);
//     listDisplay.appendChild(li);
//     });
// }

function loadTasks(filter = "all") {
  listDisplay.innerHTML = "";

  const taskData = JSON.parse(localStorage.getItem("Data")) || [];

  taskData.forEach((item) => {
    const shouldShow =
      filter === "all" ||
      (filter === "done" && item.done) ||
      (filter === "pending" && !item.done);//REMEMBER THIS IS INSIDE A LOOP, THIS CONDITION CHECK THIS ITERATION

    if (!shouldShow) return;

    const li = document.createElement("li");
    li.innerHTML = `<span>${item.text}</span>`;
    if (item.done) li.classList.add("done");
    listDisplay.appendChild(li);

    const delBtn = document.createElement("button");
    delBtn.textContent = "DEL";
    delBtn.classList.add("red");
    delBtn.addEventListener("click",()=>{
      li.remove(); 
      saveTasks();
    });

    li.addEventListener("click",()=>{
      li.classList.toggle("done");
      saveTasks();
    });

    li.appendChild(delBtn);
    listDisplay.appendChild(li);
    });
  }


clearBtn.addEventListener("click",()=>{
  document.querySelectorAll("li").forEach(list => {
    console.log("called");
    console.log(list);
    list.remove();
     console.log(list);
  });
  saveTasks()
});

loadTasks();