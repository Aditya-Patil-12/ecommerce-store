const express = require('express');
const cors =require('cors');
const app = express();
app.use(cors())

app.get("/api/v1", (req, res) => {
  return res.json({
    greet:"welcome guys",
  });
});

app.listen(5000,()=>{
    console.log("Server Listening in App.js Backend");
})