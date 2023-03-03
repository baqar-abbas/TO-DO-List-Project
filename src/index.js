import './style.css';
import { addTask, todoItems } from './todo.js';
import updateCompletedStatus from './status.js';
import select2 from '../images/select.png';
import delete2 from '../images/delete.png';
import refresh from '../images/refresh.png';
import edit from '../images/edit.jpg';

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
  ul.innerHTML = ''; // clear the list before re-rendering it
  for (let i = 0; i < todoItems.length; i += 1) {
    const node = document.createElement('li');
    node.setAttribute('class', 'todo-item');
    node.setAttribute('data-key', todoItems[i].index);
    node.setAttribute('class', 'todo-item editable');

    node.innerHTML = ` 
        <input class="checkbox" id="${todoItems[i].index}" type="checkbox"/>
        <label for="${todoItems[i].index}" class="option">
            <img class="select" src=${select2} alt=""/>
            <img class="delete" src=${delete2} alt=""/>
            <img class="edit" src=${edit} alt="edittext"/>
        </label>
        <input class="items" type="text" value="${todoItems[i].text}" readonly />

    `;
    ul.append(node);

    // Get the selectdots, deleteoption, and editoption elements for this task
    const selectdots = node.querySelector('.select');
    const deleteoption = node.querySelector('.delete');
    const editoption = node.querySelector('.edit');
    // Get the checkbox element for this task
    const checkbox = node.querySelector('.checkbox');

    // Add event listener for completing a task
    checkbox.addEventListener('change', () => {
      const itemKey = parseInt(node.getAttribute('data-key'), 10);
      const completed = checkbox.checked;
      updateCompletedStatus(itemKey, completed);
      // Find the text element for this task
      //   const textElement = node.querySelector('.items');
      // Add line-through style to the text when checkbox is checked
      if (completed) {
        node.querySelector('.items').style.textDecoration = 'line-through';
      } else {
        node.querySelector('.items').style.textDecoration = 'none';
      }
    });

    const clearCompletedTasks = () => {
      const uncompletedTasks = todoItems.filter((item) => !item.completed);
      todoItems.length = 0;
      todoItems.push(...uncompletedTasks);
      for (let i = 0; i < uncompletedTasks.length; i += 1) {
        uncompletedTasks[i].index = i + 1;
      }
      localStorage.setItem('todoItems', JSON.stringify(todoItems));
      display();
    };

    btnDeleteAll.addEventListener('click', () => {
      clearCompletedTasks();
    });

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

    editoption.addEventListener('click', () => {
      const itemKey = parseInt(node.getAttribute('data-key'), 10);
      const itemIndex = todoItems.findIndex((item) => item.index === itemKey);

      // Toggle the readonly attribute on the input element
      const inputElement = node.querySelector('.items');
      inputElement.readOnly = !inputElement.readOnly;

      // Toggle the editable class on the li element
      node.classList.toggle('editable');

      // If the input element is now editable, focus on it
      if (!inputElement.readOnly) {
        inputElement.focus();
      }

      // If the user presses the Enter key while editing the input element, update the task text
      inputElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          const newTaskText = inputElement.value;
          todoItems[itemIndex].text = newTaskText;
          localStorage.setItem('todoItems', JSON.stringify(todoItems));
          display();
        }
      });

      // Add an event listener to the input element to toggle the editable class on the li element
      inputElement.addEventListener('blur', () => {
        node.classList.remove('editable');
      });
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
    ul.innerHTML = '';
    display();
  }
});