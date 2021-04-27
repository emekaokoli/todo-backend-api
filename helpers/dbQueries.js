module.exports.todo_plain_string = 'title,status';

module.exports.insert_todos = 'INSERT INTO todo(title,status) VALUES ($1,$2)';

module.exports.queryAll = 'SELECT * FROM todo ORDER BY id ASC';

module.exports._id = 'id';

module.exports.queryOneTodo = 'SELECT * FROM todo WHERE id = $1';

module.exports.deleteOneTodo = 'DELETE FROM todo WHERE id = $1';

module.exports.updateTodo = 'UPDATE subtasks SET title = $1  status = $2  WHERE id = $3';
