"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const requestIp = require("request-ip");
/*
 * Load up and parse configuration details from
 * the `.env` file to the `process.env`
 * object of Node.js
 */
dotenv_1.default.config();
/*
 * Create an Express application and get the
 * value of the PORT environment variable
 * from the `process.env`
 */
const app = (0, express_1.default)();
app.set("trust proxy", true);
const port = process.env.PORT || 3000;
/* Define a route for the root path ("/")
 using the HTTP GET method */
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.get("/order", (req, res) => {
    const ipAddress = req.ip;
    const ipAddress1 = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const clientIp = ipAddress1.split(",")[0];
    res.json({
        message: `Hello! Your IP address is: ${ipAddress} and ${clientIp}`,
    });
});
/* Start the Express app and listen
 for incoming requests on the specified port */
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
