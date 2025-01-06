const express = require('express');
const dotenv= require('dotenv');
const dbConnect = require("./db");
const chats = require('./data/data');
const app = express();
// const port = 5000;
dotenv.config()
const PORT = process.env.PORT ;
// console.log(PORT);

dbConnect();

//common js model(require garnuparxa )
//ES6 modal(ECMA script modal) (import garnu parxa)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

  app.get('/chats', (req, res) => {
    res.send(chats)
  })

 app.get("/chats/:id",(req,res)=>{
    console.log(req.params.id);
    const singleChat = chats.find((c)=> c._id === req.params.id);
    res.send(singleChat);
 });
 app.use('/api/auth', require("./routes/Auth"));
//  app.use('/api/product', require("./routes/product"));

app.listen(PORT, () => {
  console.log(`MY app listening on port ${PORT}`)
})









