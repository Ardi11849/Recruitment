var db = {
    connection: require('./mysql'),
    response: require('./response'),
    common: require('../middleware/common'),

    all: async function (sql, params, res) {
        try{
            var rows = await db.connection.query(sql, params);
            return rows;
        } catch (err) {
            throw err;
        }
    },

    single: async function (sql, params, res) {
        try {
            var rows = await db.connection.query(sql, params);
            // db.common.log(JSON.stringify(rows[0]));
            console.log(rows[0]);
            return rows[0];
        } catch (err) {
            throw err;
        }
    },

    insert: async function (sql, params) {
        try {
            await db.connection.execute(sql, params);
            return "done";
        } catch (err) {
            throw err;
        }
    },

    update: async function (sql, params) {
        try {
            await db.connection.execute(sql, params);
            return "done";
        } catch (err) {
            throw err;
        }
    },
    
    delete: async function (tableName, id, res) {
        try {
            await db.connection.execute("DELETE FROM " + tableName + " WHERE id = ?;", [id]);
            return "done";
        } catch (err) {
            throw err;
        }
    }
};

module.exports = db;