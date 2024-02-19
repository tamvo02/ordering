// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const requestIp = require("request-ip");

/*
 * Load up and parse configuration details from
 * the `.env` file to the `process.env`
 * object of Node.js
 */
dotenv.config();

/*
 * Create an Express application and get the
 * value of the PORT environment variable
 * from the `process.env`
 */
const app: Express = express();

app.set("trust proxy", true);

const port = process.env.PORT || 3000;

/* Define a route for the root path ("/")
 using the HTTP GET method */
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/order", (req, res) => {
  const ipAddress = req.ip;
  const ipAddress1 =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  res.json({
    message: `Hello! Your IP address is: ${ipAddress} and ${ipAddress1}`,
  });
});
/* Start the Express app and listen
 for incoming requests on the specified port */
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
