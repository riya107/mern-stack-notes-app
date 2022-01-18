const mongoose=require('mongoose')
const validator=require('validator')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            return validator.isEmail(value)
        }
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
        validate(value){
            return validator.isDate(value)
        }
    }
})

module.exports=mongoose.model('User',userSchema)