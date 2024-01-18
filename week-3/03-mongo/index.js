const express = require('express');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");
const PORT = 3000;
// Middleware for parsing request bodies
app.use(express.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter)

app.all('*',(req,res)=>{
    res.status(404).send("Page not found");
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
