import express from "express";
import prisma from "./src/utils/prisma.js";
import morgan from "morgan";
import cors from "cors";
import sellersRouter from "./src/controllers/auth.Seller.controllers.js"
import usersRouter from "./src/controllers/auth.User.controllers.js"

const app = express();
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use("/auth-seller", sellersRouter)
app.use("/auth-user", usersRouter)
app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;

// things to note
// to start docker, we need to do this
//docker compose --env-file=.env.development up
//or
//docker compose --env-file=.env.development up -d # to run in detached mode

