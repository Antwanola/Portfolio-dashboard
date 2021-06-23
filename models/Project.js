const mongoose = require('mongoose')
const Schema = mongoose.Schema




const project = new Schema({
    category:{
        type:Schema.Types.ObjectId,
        ref: 'categories'
    },

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
    status:{
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
    firstPara:{
        type:String,

    },
    secondPara:{
        type:String,
        
    },
    thirdPara:{
        type:String,
        
    },
    date:{
        type:Date,
        default:Date.now()
    },

    comment:[{
        type:Schema.Types.ObjectId,
        ref:'comments'

    }]
})


module.exports = mongoose.model('projects', project)