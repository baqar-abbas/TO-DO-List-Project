const {
  addTask, todoItemstest, removeTask, editTask,
} = require('./add.js');

describe('Add Task', () => {
  test('Initial length of array should be 0', () => {
    expect(todoItemstest.length).toBe(0);
  });

  test('Add a new task to the array', () => {
    const newTask = 'text1';
    const addedTask = addTask(newTask);
    expect(todoItemstest.length).toBe(1);
    expect(addedTask).toBe(newTask);
  });
});

describe('Remove Task', () => {
  test('Remove an existing task from the array', () => {
    const newTask = 'text1';
    addTask(newTask);
    const removedTask = removeTask(newTask);
    expect(todoItemstest.length).toBe(1);
    expect(removedTask).toBe(newTask);
  });

  test('Remove a non-existing task from the array', () => {
    const nonExistingTask = 'text3';
    const removedTask = removeTask(nonExistingTask);
    expect(todoItemstest.length).toBe(1);
    expect(removedTask).toBeNull();
  });
});

describe('Edit Task', () => {
  test('Edit an existing task in the array', () => {
    const oldTask = 'text1';
    const newTask = 'text2';
    addTask(oldTask);
    const editedTask = editTask(oldTask, newTask);
    expect(todoItemstest.length).toBe(2);
    expect(editedTask).toBe(newTask);
  });

  test('Edit a non-existing task in the array', () => {
    const oldTask = 'text1';
    const newTask = 'text2';
    const editedTask = editTask(oldTask, newTask);
    expect(todoItemstest.length).toBe(2);
    expect(editedTask).toBe(editedTask);
  });
});