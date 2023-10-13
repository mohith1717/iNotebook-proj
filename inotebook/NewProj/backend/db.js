// const { default: mongoose } = require('mongoose');
const mongoose=require('mongoose');
const mongoURI="mongodb+srv://mohithvv7:uiOMruGBoWqJDGR7@clusterme.vqaooi5.mongodb.net/inotebook?retryWrites=true&w=majority";

const connectToMongo=()=>{
    mongoose.connect(mongoURI);
    console.log("connected successfully");
}
module.exports=connectToMongo;