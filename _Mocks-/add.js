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

const editTask = (oldText, newText) => {
  const index = todoItemstest.indexOf(oldText);
  if (index > -1) {
    todoItemstest[index] = newText;
    return newText;
  }
  return null;
};

module.exports = {
  addTask, todoItemstest, removeTask, editTask,
};
