const mongoose=require("mongoose");

const characterSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    race:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        required:true,
        default:Date.now
    }
})

module.exports=mongoose.model("Character", characterSchema);