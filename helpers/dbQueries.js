module.exports.todo_plain_string = 'title, status';

module.exports.insert_todos = 'INSERT INTO todo(title, status) VALUES ($1,$2) RETURNING *';

module.exports.queryAll = 'SELECT * FROM todo ORDER BY id ASC';
//module.exports.queryAll = 'SELECT todo.id,todo.title FROM todo ,subtasks WHERE  todo.id = subtasks.id'

module.exports._id = 'todo_id';

module.exports.queryOneTodo = 'SELECT * FROM todo WHERE id = $1';

module.exports.deleteOneTodo = 'DELETE FROM todo WHERE id = $1';

module.exports.updateTodo = 'UPDATE todo SET title = $1,  status = $2  WHERE id = $3';


// subtasks
module.exports.subtask_plain_string = 'title, status';

module.exports.insert_subtasks ='INSERT INTO subtask(title, status) VALUES ($1,$2) RETURNING *';

//module.exports.queryAllSubtask = 'SELECT * FROM subtasks ORDER BY id ASC'; 

// module.exports.queryAllSubtask =  'SELECT todo.id,todo.title FROM todo ,subtasks WHERE  todo.id = subtasks.id'
 module.exports.queryAllSubtask = 'SELECT todo.todo_id, todo.title,todo.status,  subtask.todo_id, subtask.title, subtask.status FROM todo INNER JOIN subtask ON todo.todo_id = subtask.id';

module.exports.id = 'id';

module.exports.queryOneSubtask = 'SELECT * FROM subtask WHERE id = $1';

module.exports.deleteOneSubtask = 'DELETE FROM subtask WHERE id = $1';

module.exports.updateSubtask = 'UPDATE subtask SET title = $1,  status = $2  WHERE id = $3';