const tasksModel = require('../models/tasks');
const subtasksModel = require('../models/subtasks');

module.exports = {
    findOneTask: async ({id, resolve, reject}) => {
        const result = await tasksModel.findOne(id);
    
        if (result != null) {
            resolve(result);
        } else {
            reject && reject();
        }
    },

    findOneSubtask: async ({id, todo_id, resolve, reject}) => {
        const result = await subtasksModel.findOne({ id, todo_id });
    
        if (result != null) {
            resolve(result);
        } else {
            reject && reject();
        }
    }
};
