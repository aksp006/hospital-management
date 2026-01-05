const mongoose = require('mongoose')


const loginSchema = mongoose.Schema({
    username:{
        type : String,
        required : true,
        unique : true
    },

    password:{
        type:String,
        required: true,
      
    },

    role:{
        type :String,
        enum:["nurse","doctor","patient","reception"],
        default:"patient"
    }

})

const login = mongoose.model("login",loginSchema);

module.exports=login;

