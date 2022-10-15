import { v4 as uuidV4 } from "uuid";
import "./css/default.css";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("new-task-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: Task[] = loadTasks();
tasks.forEach(addListItem); //for each task we'll render

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input?.value == "" || input?.value == null) return;

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false, //with this, checkbox is not (initially) ticked
    createdAt: new Date(),
  };
  tasks.push(newTask); //하나아이템 type then push, then it's uploaded(stored). <-wrote it after line 13

  addListItem(newTask);
  input.value = ""; //clear the input type part, as you already made one to do item
});

function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const deletebtn = document.createElement("button");
  const editbtn = document.createElement("button");
  deletebtn.classList.add("deletebtn");
  editbtn.classList.add("editbtn");
  const checkbox = document.createElement("input");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked; //with this, checkbox will be ticked
    saveTasks(); //create a function to save the item made -> after this, code 47 was written.
  });
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  item.append(deletebtn);
  item.append(editbtn);
  list?.append(item);
  deletebtn.addEventListener("click", function () {
    item.parentNode?.removeChild(item);
  });
  editbtn.addEventListener("click", function () {
    label.blur();
  });
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null) return []; //if taskJSON is null, return to an empty array
  return JSON.parse(taskJSON); // if it's not null, return to the taskJSON. As : Task[] is written after func loadTasks(), it will specifically parse the array. Without it, it will parse anything
}
