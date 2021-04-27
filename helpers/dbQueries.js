module.exports.todo_plain_string = 'title,status,subtasks';

module.exports.insert_todos =
  'INSERT INTO todo_table(title,status,subtasks) VALUES ($1,$2,$3)';

//module.exports.delete_todo_query ='DELETE FROM todo_table WHERE id = $1 RETURNING *';

module.exports.queryAll = 'SELECT * FROM todo_table ORDER BY id ASC';

module.exports._id = 'id';

module.exports.queryOneTodo = 'SELECT * FROM todo_table WHERE id = $1';

module.exports.deleteOneTodo = 'DELETE FROM todo_table WHERE id = $1';