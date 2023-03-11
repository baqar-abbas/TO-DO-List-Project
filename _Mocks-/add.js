const todoItemstest = [];

const addTask = (text) => {
  const newTask = text;
  todoItemstest.push(newTask);
  return newTask;
};

const removeTask = (text) => {
  const index = todoItemstest.indexOf(text);
  if (index > -1) {
    const removedTask = todoItemstest.splice(index, 1)[0];
    return removedTask;
  }
  return null;
};

module.exports = { addTask, todoItemstest, removeTask };
