import express from "express";
import errorHandler, { BadRequest } from "./handlers/error_handler.js";
import mongoose from "mongoose";
import router from "./routes/user_route.js";
import cors from "cors";

const app = express();
const port = 3000;

mongoose
  .connect("mongodb://localhost:27017/Nikahbay", {
    useNewUrlParser: true,
  })
  .then((value) => {
    console.log("Connected successfully ");
  })
  .catch((err) => {
    console.log("Error in db connection " + err);
  });
app.use(cors());

app.use(
  express.json({
    limit: "20mb",
  })
);
app.use("/api/user", router);
app.use("/api/profile", express.static("./public/profile"));

app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
