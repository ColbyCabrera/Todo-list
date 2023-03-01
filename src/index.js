import './style.css';
import { createTodo, todo } from "./todo";
import { createProject } from "./project"
import { init } from './domManip';

//https://www.velotio.com/engineering-blog/design-patterns-in-es6

// todo properties
// title desc, dueDate, priority, notes

// todos are grouped into projects optionally, otherwise put in default project

// only show desc and notes when clicked on

// Show default project by default and display all todos in it
// when another project is selected display only those in project
// when a project is created display only todos in that project (empty anyways)

const newTodoBtn = document.getElementById("todo-submit");
const newProjectBtn = document.getElementById("project-submit");
init();

newTodoBtn.addEventListener('click', createTodo);
newProjectBtn.addEventListener('click', createProject);