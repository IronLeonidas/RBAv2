let config, main, server;

console.log("Attempting to load config...");
try {
    config = require("./src/config");
    console.log("Successfully loaded config!");
} catch (err) {
    console.error("Config Error:", err);

    process.exit(1);
}

console.log("Attemtping to load application...");
try {
    main = require("./src/main");
    console.log("Successfully loaded application!");
} catch (err) {
    console.error("Failed to load application:", err);

    process.exit(1);
}

const { port } = config.main;

console.log("Attempting to start server...");
try {
    server = main.listen(port, () => {
        console.info(`App ready at: http://localhost:${port}`);
    });
} catch (err) {
    console.error("Failed to load server:", err);

    process.exit(1);
}

process.on("SIGINT", () => {
    server.close(() => {
        console.info("Server closed. ᚺᛖᛁᛚ (Farewell).")

        process.exit(0);
    });
})