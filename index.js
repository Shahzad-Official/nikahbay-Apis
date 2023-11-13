import express from "express";
import errorHandler from "./handlers/error_handler.js";
import mongoose from "mongoose";
import cors from "cors";
import hobbyRouter from "./User/routes/hobby_route.js";
import userRouter from "./User/routes/user_route.js";
import countryRouter from "./User/routes/country_route.js";
import adminRoute from "./Admin/routes/admin_auth_routes.js";
import LocalDBSetting from "./utils/refresh_token.js";


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

app.use("/api/admin",adminRoute);
app.use("/api/hobbies",hobbyRouter);
app.use("/api/user", userRouter);
app.use("/api", countryRouter);
app.use("/api/profile", express.static("./public/profile"));
app.use("/api/admin", express.static("./public/admin"));
app.use("/api",  (req, res, next) => {
 
  res.json("hello world");
  
});
app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
