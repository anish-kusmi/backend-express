const mongoose= require('mongoose')
// const Mongo_URI = "mongodb://localhost:27017//kartik-group";

const dbConnect= ()=>{
    mongoose.connect(process.env.Mongo_URI)
    .then(()=>console.log("MongoDB Connected Successfully!!!"))
};
module.exports = dbConnect;