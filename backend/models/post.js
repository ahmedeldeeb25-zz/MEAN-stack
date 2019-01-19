const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        default:'default title'
    },
    content:{
        type:String,
        require:true
    },
    imagePath: { type: String, required: true }
})


module.exports = mongoose.model("Post",postSchema);


 
