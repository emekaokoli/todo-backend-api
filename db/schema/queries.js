// Data Definition Language queries - defines the structure of the database tables.

module.exports = {
    tasks: {
        createTable: `
            CREATE TABLE tasks(
                id              SERIAL PRIMARY KEY,
                title           TEXT NOT NULL,
                status          TEXT NOT NULL DEFAULT 'pending',
                created_at      TIMESTAMP NOT NULL DEFAULT NOW()
            );
        `,
        insert: `
            INSERT INTO tasks(title)
            VALUES ($1)
            RETURNING *
        `,
        updateStatus: `
            UPDATE tasks
            SET status = $1
            WHERE id = $2
        `,
        delete: `
            DELETE FROM tasks
            WHERE id = $1
        `,
        selectAll: `
            SELECT id, title, status, created_at
            FROM tasks
            ORDER BY id
        `,
        selectOne: `
            SELECT id, title, status, created_at
            FROM tasks
            WHERE id = $1
        `,
    },
    subtasks: {
        createTable: `
            CREATE TABLE subtasks(
                id              SERIAL PRIMARY KEY,
                title           TEXT NOT NULL,
                status          TEXT NOT NULL DEFAULT 'pending',
                todo_id         INT REFERENCES tasks(id) ON DELETE CASCADE,
                created_at      TIMESTAMP NOT NULL DEFAULT NOW()
            );
        `,
        insert: `
            INSERT INTO subtasks(title, todo_id)
            VALUES ($1, $2)
            RETURNING *
        `,
        updateStatus: `
            UPDATE subtasks
            SET status = $1
            WHERE todo_id = $2 AND id = $3
        `,
        updateAllSubtasks: `
            UPDATE subtasks
            SET status = $1
            WHERE todo_id = $2
        `,
        delete: `
            DELETE FROM subtasks
            WHERE todo_id = $1 AND id = $2
        `,
        selectAll: `
            SELECT id, title, status, todo_id, created_at
            FROM subtasks
            WHERE todo_id = $1
            ORDER BY id
        `,
        selectOne: `
            SELECT id, title, status, todo_id, created_at
            FROM subtasks
            WHERE todo_id = $1 AND id = $2
        `
    }
};
