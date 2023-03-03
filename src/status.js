import { todoItems } from './todo.js';

const updateCompletedStatus = (index, completed) => {
  const task = todoItems.find((item) => item.index === index);
  task.completed = completed;
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
};
export default updateCompletedStatus;
