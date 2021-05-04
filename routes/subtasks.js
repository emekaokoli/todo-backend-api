const routes = require('express').Router({ mergeParams: true });
const routeNames = require('../util/routes');
const subtasksModel = require('../models/subtasks');
const { normalizeResponse } = require('../util/response_handler');
const { findOneTask, findOneSubtask } = require('../util/task_finder');
const tasksModel = require('../models/tasks');

const ok = (res, data) => res.status(200).json(
    normalizeResponse(data)
);

routes.get(routeNames.subtasks.all, async (req, res) => {
    const todo_id = req.params['todo_id'];

    findOneTask({
        id: todo_id,
        resolve: async () => {
            const result = await subtasksModel.findAll(todo_id);
            ok(res, result);
        },
        reject: () => {
            res.status(404).json(
                normalizeResponse(null, {
                    message: `Task with id ${todo_id} was not found.`
                })
            );
        }
    });
});

routes.get(routeNames.subtasks.one(':id'), (req, res) => {
    const { id, todo_id } = req.params;

    findOneSubtask({
        id,
        todo_id,
        resolve: (result) => ok(res, result),
        reject: () => {
            res.status(404).json(
                normalizeResponse(null, {
                    message: `Subtask with id ${id} and todo_id ${todo_id} not found`
                })
            );
        }
    });
});

routes.post(routeNames.subtasks.all, async (req, res) => {
    const { todo_id } = req.params;

    try {
        findOneTask({
            id: todo_id,
            resolve: async () => {
                const { title } = req.body;
                const result = await subtasksModel.create({ title, todo_id });

                await tasksModel.updateStatus({ id: todo_id, status: 'pending' });

                ok(res, result);
            },
            reject: () => {
                res.status(404).json(
                    normalizeResponse(null, {
                        message: `Task with id ${todo_id} not found`
                    })
                );
            }
        });
    } catch(e) {
        res.status(500).json(
            normalizeResponse(null, {
                message: `An error occurred ${e}`
            })
        );
    }
});

routes.put(routeNames.subtasks.one(':id'), (req, res) => {

    const { todo_id, id } = req.params;

    try {
        findOneSubtask({
            id,
            todo_id,
            resolve: async (subtask) => {
                // just toggle the subtask status
                const newStatus = subtask.status === 'pending' ? 'completed' : 'pending';

                const result = await subtasksModel.updateStatus({ id, status: newStatus, todo_id });
                const allSubtasks = await subtasksModel.findAll(todo_id);

                const isAllCompleted = allSubtasks.every(st => st.status === 'completed');

                await tasksModel.updateStatus({ id: todo_id, status: isAllCompleted ? 'completed' : 'pending' });

                ok(res, result);
            },
            reject: async () => {
                res.status(404).json(
                    normalizeResponse(null, {
                        message: `Subtask with id ${id} and todo_id ${todo_id} not found`
                    })
                );
            }
        });
    } catch(e) {
        res.status(500).json(
            normalizeResponse(null, {
                message: `An error occurred ${e}`
            })
        );
    }
});

routes.delete(routeNames.tasks.one(':id'), (req, res) => {
    res.send('Hello World, of deleted Subtasks!');
});

module.exports = routes;
