import express from "express";
import errorHandler from "./handlers/error_handler.js";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user_route.js";
import countryRouter from "./routes/country_route.js";

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
app.use("/api/user", userRouter);
app.use("/api",countryRouter);
app.use("/api/profile", express.static("./public/profile"));
app.use("/",(req,res,next)=>{
  
res.json({message:"hello world"});
});
app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
