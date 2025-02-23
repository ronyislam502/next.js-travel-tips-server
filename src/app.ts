import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app: Application = express();

app.use(express());
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
