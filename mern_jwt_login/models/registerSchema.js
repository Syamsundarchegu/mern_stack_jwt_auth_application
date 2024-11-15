const mongoose  = require('mongoose');


const registerSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        min:5
    },
    confirmpassword:{
        type:String,
        required:true,
        min:5
    }
})

module.exports = mongoose.model('register', registerSchema)