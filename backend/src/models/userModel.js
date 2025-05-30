const db = require("../config/database");
const UserModel = {
    async getUserById(uuid) {
        const connection = await db.createConnection();
        const [rows] = await connection.execute("SELECT user_id as id, uuid, name, email, password, token_version FROM users WHERE uuid = ?", [uuid]);

        await connection.end();

        return rows.length? rows[0] : null;
    },
    async getUserByEmail(email) {
        const connection = await db.createConnection();
        const [rows] = await connection.execute("SELECT user_id as id, uuid, name, email, password, token_version FROM users WHERE email = ?", [email]);
        
        await connection.end();

        return rows.length ? rows[0] : null;
    },
    async setRefreshToken(uuid, refreshToken) {
        const connection = await db.createConnection();
        const [result] = await connection.execute("UPDATE users SET refresh_token = ? WHERE uuid = ?", [refreshToken, uuid]);

        await connection.end();

        return result.affectedRows > 0;
    },
    async createUser({uuid, name, email, passwordHash}) {
        const connection = await db.createConnection();

        await connection.execute("INSERT INTO users (uuid, name, email, password) VALUES (?, ?, ?, ?)", [uuid, name, email, passwordHash]);

        await connection.end();
    },
    async incrementTokenVersion(uuid) {
        const connection = await db.createConnection();

        const [result] = await connection.execute("UPDATE users SET token_version = token_version + 1 WHERE uuid = ?", [uuid]);

        await connection.end();
        
        return result.affectedRows > 0;
    }
};

module.exports = UserModel;