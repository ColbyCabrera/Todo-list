import './style.css';
import {createTodo, todo} from "./todo";
import { domCache, getFormData } from './domManip';

//https://www.velotio.com/engineering-blog/design-patterns-in-es6

// todo properties
// title desc, dueDate, priority, notes

// todos are grouped into projects optionally

// only show desc and notes when clicked on

const btn = document.getElementById("submit");

btn.addEventListener('click', createTodo);