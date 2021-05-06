const express = require('express');
const { isEmpty } = require('../../helpers/uoload-helper');
const Project = require('../../models/Project');
const router = express.Router();


router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'admin'
    next()
})

router.get('/', (req, res)=>{
    res.render('admin/home')
})

router.get('/projects', (req, res)=>{
Project.find({}).lean().then(projects=>{


    res.render('admin/project/Projects', {projects})

})


    
})


router.get('/create-project', (req, res)=>{



    res.render('admin/project/create-project')
})



router.post('/create-project', (req, res)=>{

    let errors = []
if(!req.body.title){
    errors.push({error:'Please add a title'})
}

if(!req.body.description ){
    errors.push({error:'Please add description'})
}

if(errors.length>0){
    res.render('admin/project/create-project', {errors})
}
else{

    let file;
    file = req.files.file
    fileName = Date.now() + '-' + file.name;
    if(!isEmpty(req.files)){

        file.mv('./public/uploads/' +fileName, (error)=>{
            errors.push({error})
        })
    }
    let allowComment = true
    req.body.allowComment ? allowcomment = true: allowComment = false

    console.log(allowComment)


    const project = new Project({
        title:req.body.title,
        file:fileName,
        status:req.body.status,
        allowComment:allowComment,
        category:req.body.category,
        description: req.body.description

    })
    project.save().then(saved=>{
        res.redirect('/admin/projects', )
    })

}

router.put('/project/edit/:id', (req, res)=>{

res.render('')
})




})




module.exports = router