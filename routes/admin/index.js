const express = require('express');
const { isEmpty } = require('../../helpers/upload-helper');
const Project = require('../../models/Project');
const Category = require('../../models/Category');
const router = express.Router();
const fs = require('fs')
// const flash = require('connect-flash')


router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'admin'
    next()
})


//get home
router.get('/', (req, res)=>{
    res.render('admin/home')
})


//get project
router.get('/projects', (req, res)=>{
Project.find({}).lean().then(projects=>{

    res.render('admin/project/Projects', {projects})

})


    
})

//get create page
router.get('/create-project', (req, res)=>{
Category.find({}).lean().then(categories=>{
    
    res.render('admin/project/create-project', {categories})
})
})


//Create Project
router.post('/create-project', (req, res)=>{

    let message = []
if(!req.body.title){
    req.flash('mesasge','Please add a title')
}

if(!req.body.description ){
    req.flash('message', 'Please add description')
}

if(message.length>0){
    res.render('admin/project/create-project',req.flash('message') )
}
else{

    let file;
    file = req.files.file
    fileName = Date.now() + '-' + file.name;
    if(!isEmpty(req.files)){
        file.mv('./public/uploads/' +fileName, (error)=>{
           req.flash('message', `${error}`)
            
        })
    }
    let allowComment = true
    req.body.allowComment ? allowcomment = true: allowComment = false

   


    const project = new Project({
        title:req.body.title,
        file:fileName,
        status:req.body.status,
        allowComment:allowComment,
        category:req.body.category,
        description: req.body.description

    })
    project.save().then(saved=>{
        req.flash('message','Project with the title'+ saved.title+ 'was created successfully')
       
        res.redirect('/admin/projects', )
       
        
    })

}






})


//Display Each project
router.get('/project/edit/:id',(req, res)=>{
    Project.findOne({_id:req.params.id}).lean().then(project=>{
    Category.find({}).lean().then(categories=>{
       
        res.render('admin/project/edit', {project, categories})
    })
})

})

// Edit Each Project
router.put('/project/edit/:id', (req, res)=>{
   
    Project.findOne({_id:req.params.id}).then(project=>{
      
        req.body.allowComment ? allowComment =true: allowComment = false
        let errors = []
        let message = [];
        let file;
        if(!isEmpty(req.files)){
            file = req.files.file
        fileName = Date.now() + '-' + file.name;
            project.file = fileName
            file.mv('./public/uploads/' +fileName, (error)=>{
                req.flash('message', `${error}`)
            })
        }
        else{
            return req.flash('message','please add an image')
        }
        project.title = req.body.title,
        project.status = req.body.status,
        project.allowComment = allowComment,
        project.category = req.body.category,
        project.description = req.body.description

       project.save().then(saved=>{
            console.log(saved)
            req.flash('message', 'The project with the title ' +saved.title+ ' has been updated')
            console.log(message)
            res.redirect('/admin/projects')
        })
        .catch(err=>{
            console.log(err)
        })

      
})
.catch(err=>{
    console.log(err)
})
});
 
//Delete Each Project
router.delete('/projects/:id', (req, res)=>{
    let message = []
    Project.findOne({_id:req.params.id}).then(project=>{
        fs.unlink('./public/uploads/' + project.file, (err)=>{
            return err
        })
        project.delete()
    })
    res.redirect('/admin/projects')
    message.push({message:'Project with the title'+ project.title+ 'was deleted successfully '})
})


//Get cqtegories
router.get('/categories', (req, res)=>{
    Category.find({}).lean().then(categories=>{
       
        res.render('admin/categories/categories', {categories})
    })
    })
    

//Post category
router.post('/categories', (req, res)=>{
   const category = new Category({
        category: req.body.category,
        message: req.body.message
    })

    category.save().then(saved=>{
       
        res.redirect('/admin/categories')

    })
})



//Get category update page
router.get('/category/update/:id', (req, res)=>{
    Category.findOne({_id:req.params.id}).lean().then(category=>{
        res.render('admin/categories/edit', {category})
    })
})




//Update category
router.put('/category/:id', (req, res)=>{
    Category.findOne({_id:req.params.id}).then(category=>{
        category.category = req.body.category,
        category.message = req.body.message
        category.save().then(saved=>{
           
        })
    })
    res.redirect('/admin/categories')
})



//Delete category
router.delete('/category/delete/:id', (req, res)=>{
    Category.findOne({_id:req.params.id}).then(category=>{
        category.delete()
    })
    res.redirect('/admin/categories')
})



module.exports = router