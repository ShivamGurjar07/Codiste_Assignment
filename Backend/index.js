const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/travel", require("./routes/travelRoutes"));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});
// console.log("MongoDB URL:", process.env.url);
// console.log("JWT Secret:", process.env.JWT_SECRET);
const PORT = process.env.PORT || 1010;
app.listen(PORT, () => console.log("Server is running..."));
