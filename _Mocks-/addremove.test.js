const { addTask, todoItemstest, removeTask } = require('./add.js');

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
