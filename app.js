import express from "express";
import prisma from "./src/utils/prisma.js";
import morgan from "morgan";

const app = express();
app.use(morgan("combined"));

app.listen(port, () => {
  console.log(`App started; listening on port ${port}`);
});

export default app;

// things to note
// to start docker, we need to do this
//docker compose --env-file=.env.development up
//or
//docker compose --env-file=.env.development up -d # to run in detached mode
