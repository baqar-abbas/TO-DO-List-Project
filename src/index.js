import './style.css';
import select2 from '../images/select.png';
import delete2 from '../images/delete.png';
import refresh from '../images/refresh.png';

let order = 0;
const todoItems = [
  {
    text: 'complete Javascript Practice Session',
    completed: false,
    index: order += 1,
  },
  {
    text: 'complete To Do list project',
    completed: false,
    index: 0,
  },

];

const container = document.getElementById('container');
const form = document.querySelector('form');
const ul = document.querySelector('.todoList');
form.innerHTML = `
<label class="title"
>Today's To Do <img class="refresh" src=${refresh} alt="refresh"
/></label>
<input
class="inputText"
placeholder="Add to your list..."
type="text"
/>
`;
const btnDeleteAll = document.createElement('button');
btnDeleteAll.setAttribute('class', 'delete-all');
btnDeleteAll.textContent = 'Clear all completed';
container.append(btnDeleteAll);

const display = () => {
  todoItems.sort((a, b) => a.index - b.index);
  for (let i = 0; i < todoItems.length; i += 1) {
    const node = document.createElement('li');

    node.setAttribute('class', 'todo-item');
    node.setAttribute('data-key', todoItems[i].index);

    node.innerHTML = ` 
        <input class="checkbox" id="${todoItems[i].index}" type="checkbox"/>
        <label for="${todoItems[i].index}" class="option"><img class="select"  src=${select2} alt=""/> <img class="delete"  src=${delete2} alt=""/></label>
        <span class="items">${todoItems[i].text}</span>
    
        `;
    ul.append(node);
  }
};

window.onload = display();