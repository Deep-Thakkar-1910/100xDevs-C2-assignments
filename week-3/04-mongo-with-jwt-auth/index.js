const express = require("express");
const app = express();
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

// Middleware for parsing request bodies
app.use(express.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
