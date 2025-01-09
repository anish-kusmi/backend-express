const express = require('express');
const app = express();
const dbConnect = require("./db");
const chats = require('./data/data');
const port = 5000;
// const dotenv= require('dotenv');
// dotenv.config()
// const PORT = process.env.PORT;

dbConnect();
app.use(express.json());
app.get("/", (req, res) => {
  res.send('Hello World!');
});

  app.get('/chats', (req, res) => {
    res.send(chats)
  })

 app.get("/chats/:id",(req,res)=>{
    console.log(req.params.id);
    const singleChat = chats.find((c)=> c._id === req.params.id);
    res.send(singleChat);
 });
 
 app.use('/api/auth', require("./routes/Auth"));
 app.use('/api/product', require("./routes/Product"));

app.listen(port, () => {
  console.log(`MY app listening on port ${port}`)
})









