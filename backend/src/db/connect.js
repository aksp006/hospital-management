const mongoose = require('mongoose')

const db = mongoose.connect(process.env.mongodb).then(()=>{
    console.log('db connected')
}).catch((err)=>{
    console.log(err.message)
})

module.exports=db 