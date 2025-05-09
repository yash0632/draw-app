import express from "express";
import configureSocketServer from "./sockets";
const app = express();

const PORT = process.env.PORT || 3002;
const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


configureSocketServer(server)