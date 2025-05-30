const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const { errorHandler, notFoundHandler} = require("./middlewares/error.mw");

let routes, config, main;

try {
    routes = require("./routes");
} catch(err) {
    console.error("Failed to load routes:", err);
}

try {
    config = require("./config");
} catch(err) {
    console.error("Failed to load config:", err);
}

try {
    main = express();
    main.use(express.json());

    const corsOptions = require("./config/cors");

    main.use("/api", cors(corsOptions));
    main.use(helmet());

    if (config.app.env === "development"){
        main.use(morgan("dev"));
    } else {
        main.use(morgan("combined"));
    }

    main.get("/health", (_, response) => {
        response.status(200).json({status: "ok", environment: config.main.env});
    });

    main.use("/api", routes);
    main.use(notFoundHandler);
    main.use(errorHandler);

} catch(err) {
    console.error("Failed to initialize main:", err);
}

module.exports = main;