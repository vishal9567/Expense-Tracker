import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    budget:{
        type:Number,
        default:0
    },
    expense:[
       {
        date:{
            type:Date
        },
        amount:{
            type:Number
        },
        category:{
            type:String
        }
       }
    ]
})

const User=mongoose.model('User',userSchema)
export default User