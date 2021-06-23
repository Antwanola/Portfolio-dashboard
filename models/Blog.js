const mongoose = require('mongoose')
const Schema = mongoose.Schema


const blog = new Schema({
    category:{
        type:Schema.Types.ObjectId,
        ref: 'categories'
    },
    user:{
        type:Schema.Types.ObjectId,
        ref: 'users'
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
    date:{
        type:Date,
        default:Date.now()
    },
    comment:[{
        type:Schema.Types.ObjectId,
        ref:'comments'

    }]
})









module.exports = mongoose.model('blogs', blog)