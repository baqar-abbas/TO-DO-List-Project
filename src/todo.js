// Load tasks from local storage, or use an empty array if none exists
const todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];

const addTask = (text) => {
  const newTask = {
    text,
    completed: false,
    index: todoItems.length + 1,
  };
  todoItems.push(newTask);
  localStorage.setItem('todoItems', JSON.stringify(todoItems));
};

export { addTask, todoItems };
