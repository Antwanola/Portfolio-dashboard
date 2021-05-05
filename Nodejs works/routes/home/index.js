const express = require('express');
const router = express.Router();
// const Post  = require('../../models/Post');
// const Category = require('../../models/Category');
// const User = require('../../models/User');
const bcrypt = require('bcryptjs');



router.all('/*', (res, req, next)=>{

req.app.locals.layout='main'
next()
})

//Home
router.get('/', (req, res)=>{
    
    res.render('./home/home')

})

//Project Lists
router.get('/projects', (req, res)=>{
    res.render('home/projects')
})

//Project detail
router.get('/project-detail', (req, res)=>{
    res. render('home/project-detail')
})

//Blog Lists
router.get('/blog', (req, res)=>{
    res.render('home/blogs')
})

//Blog detail
router.get('/blog-detail', (req, res)=>{
    res. render('home/blog-detail')
})






module.exports = router