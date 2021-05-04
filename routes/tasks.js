const routes = require('express').Router();
const routeNames = require('../util/routes');
const tasksModel = require('../models/tasks');
const { normalizeResponse } = require('../util/response_handler');
const { findOneTask } = require('../util/task_finder');
const subtasksModel = require('../models/subtasks');

const ok = (res, data) => res.status(200).json(
    normalizeResponse(data)
);

routes.get('/', async (_, res) => {
    const result = await tasksModel.findAll();

    const updatedTasks = await Promise.all(
        result.map(async (task) => {
            // find the subtasks.
            const subtasks = await subtasksModel.findAll(task.id);
            task.subtasks = subtasks;
            return task;
        })
    );
    ok(res, updatedTasks);
});

routes.get(routeNames.tasks.one(':id'), async (req, res) => {
    const { id } = req.params;

    findOneTask({
        id,
        resolve: async (result) => {
            // find the subtasks.
            const subtasks = await subtasksModel.findAll(id);
            result.subtasks = subtasks;
            ok(res, result)
        },
        reject: () => {
            res.status(404).json(
                normalizeResponse(null, {
                    message: `Task with id ${id} not found`
                })
            );
        }
    });
});

routes.post(routeNames.tasks.all, async (req, res) => {
    const { title } = req.body;

    try {
        const result = await tasksModel.create(title);
        ok(res, result);
    } catch(e) {
        res.status(500).json(
            normalizeResponse(null, {
                message: `An error occurred ${e}`
            })
        );
    }
});

const validStatuses = ['pending', 'completed'];

routes.put(routeNames.tasks.one(':id'), async (req, res) => {
    const { status } = req.body;

    if (status != null && !validStatuses.includes(status)) {
        return normalizeResponse(null, {
            message: `"status" must be one of ${validStatuses.join(',')}`
        });
    }

    const { id } = req.params;

    try {
        findOneTask({
            id,
            resolve: async (task) => {
                let result;

                if (status == null) { // just toggle the status
                    const newStatus = task.status === 'pending' ? 'completed' : 'pending';

                    await subtasksModel.updateAllSubtasks(task.id, newStatus);
                    result = await tasksModel.updateStatus({ id, status: newStatus });
                } else {
                    result = await tasksModel.updateStatus({ id, status });
                }
                ok(res, result);
            },
            reject: async () => {
                res.status(404).json(
                    normalizeResponse(null, {
                        message: `Task with id ${id} was not found.`
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
    res.send('Hello World, of deleted Tasks!');
});

routes.use('/:todo_id/subtasks', require('./subtasks'));

module.exports = routes;
