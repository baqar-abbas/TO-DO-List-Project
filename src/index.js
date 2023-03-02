import './style.css';
import select2 from '../images/select.png';
import delete2 from '../images/delete.png';
import refresh from '../images/refresh.png';
import edit from '../images/edit.jpg';

// Load tasks from local storage, or use an empty array if none exists
const todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];

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

const addTask = (text) => {
  const newTask = {
    text,
    completed: false,
    index: todoItems.length + 1,
  };
  todoItems.push(newTask);
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
};

const display = () => {
  todoItems.sort((a, b) => a.index - b.index);
  ul.innerHTML = ''; // clear the list before re-rendering it
  for (let i = 0; i < todoItems.length; i += 1) {
    const node = document.createElement('li');
    node.setAttribute('class', 'todo-item');
    node.setAttribute('data-key', todoItems[i].index);

    node.innerHTML = ` 
        <input class="checkbox" id="${todoItems[i].index}" type="checkbox"/>
        <label for="${todoItems[i].index}" class="option">
            <img class="select" src=${select2} alt=""/>
            <img class="delete" src=${delete2} alt=""/>
            <img class="edit" src=${edit} alt="edittext"/>
        </label>
        <span class="items">${todoItems[i].text}</span>
    `;
    ul.append(node);

    // Get the selectdots, deleteoption, and editoption elements for this task
    const selectdots = node.querySelector('.select');
    const deleteoption = node.querySelector('.delete');
    const editoption = node.querySelector('.edit');

    // Add event listeners to show the delete/edit options when the user clicks on the selectdots
    selectdots.addEventListener('click', () => {
      selectdots.style.display = 'none';
      deleteoption.style.display = 'block';
      editoption.style.display = 'block';
    });

    // Add event listener for deleting a task
    deleteoption.addEventListener('click', () => {
      const itemKey = parseInt(node.getAttribute('data-key'), 10);
      const itemIndex = todoItems.findIndex((item) => item.index === itemKey);
      todoItems.splice(itemIndex, 1);

      // Re-index the remaining tasks
      for (let i = itemIndex; i < todoItems.length; i += 1) {
        todoItems[i].index = i + 1;
      }

      localStorage.setItem('todoItems', JSON.stringify(todoItems));
      display();
    });

    // Add event listener for editing a task
    editoption.addEventListener('click', () => {
      const itemKey = parseInt(node.getAttribute('data-key'), 10);
      const itemIndex = todoItems.findIndex((item) => item.index === itemKey);
      const currentTaskText = todoItems[itemIndex].text; // get the current task text
      const newTaskText = prompt('Please enter the new task description:', currentTaskText); // pre-fill prompt with current task text
      if (newTaskText !== null && newTaskText !== '') {
        todoItems[itemIndex].text = newTaskText;
        localStorage.setItem('todoItems', JSON.stringify(todoItems));
        display();
      }
    });
  }
};

window.onload = display();

// Set up form submit event listener to add a new task
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputText = document.querySelector('.inputText');
  const text = inputText.value.trim();
  if (text !== '') {
    addTask(text);
    inputText.value = '';
    ul.innerHTML = ''; // clear the list before re-rendering it
    display();
  }
});