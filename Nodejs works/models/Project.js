const mongoose = require('mongoose')
const Schema = mongoose.Schema




const project = new Schema({
    title:{
    type: String, 
    required:true,
    },

    file:{
        type:String
    },
    category:{
        type:String
    },
    Status:{
        type:String,
        default:'Public'
    },
    allowComment:{
        type: Boolean,

    },
    description:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        default:Date.now()
    }
})


module.exports = mongoose.model('projects', project)