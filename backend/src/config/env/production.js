module.exports = {
    main: {
        env: process.env.NODE_ENV || "development",
        port: parseInt(process.env.PORT, 10) || 3000
    },
    db: {
        host: process.env.DB_HOST || "127.0.0.1",
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASS || "",
        database: process.env.DB_NAME || "book_db"
    },
    jwt: {
        secret: process.env.JWT_SECRET || "devSuperSecretKey",
        expiresIn: process.env.JWT_EXPIRES_IN || "1h"
    },
    cors: {
        origins: (process.env.ALLOWED_ORIGINS || "http://localhost:3000").split(",").map(s => s.trim())
    }
};
