const mongoose=require('mongoose')
const validator=require('validator')

const notesSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true,
        minlength:3
    },
    description:{
        type:String,
        required:true,
        minlength:3
    },
    tag:{
        type:String,
        default:'General',
        minlength:3
    },
    date:{
        type:Date,
        default:Date.now,
        validate(value){
            return validator.isDate(value)
        }
    }
})

module.exports=mongoose.model('Notes',notesSchema)