const moment = require('moment');
const mongoose = require('mongoose')

const users = mongoose.model('user', {
    username: { type: String, required: true },
    email: { type: String, required:true },
    name: { type: String, required:true },
    password: { type: String, required: true },
    profilePic : { type : String, required : true, trim : true},
})

const posts = mongoose.model('post', {
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, default: moment().format('MMMM Do YYYY, h:mm:ss a')},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' } 
})

module.exports = {
    users,
    posts
};