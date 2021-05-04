module.exports = {
  tasks: {
    all: '/',
    one: (id) => `/${id}`
  },

  subtasks: {
    all: '/',
    one: (subtaskId) => `/${subtaskId}`
  }
};
