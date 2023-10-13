const express=require('express');
const router=express.Router();
const Note=require('../models/Note');
var fetchuser=require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
// ROUTE 1:Get all the notes => api/auth/fetchallnotes

router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    // obj={
    //     a:'thios',
    //     number:34
    // }
    try {
        const notes=await Note.find({user:req.user.id});

    res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
    
})

// ROUTE 2:add a new Note using POST "/api/auth/addnote"

router.post('/addnote',fetchuser,[body("title", "Enter a valid title").isLength({
    min: 3,
  }),
  
    body("description", "Enter a descrption about length greater than 5").isLength({
        min: 5,
    }),
    
  ],async(req,res)=>{

    try {
        const {title,description,tag}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note=new Note({
        title,description,tag,user:req.user.id
    })
    const savedNote = await note.save()

            res.json(savedNote)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
    
})

// UPDATE A NOTE :using put request /api/auth/updatenote

router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag}=req.body;
    // create a new note
    const newnote={};
    if(title){
        newnote.title=title
    };
    if(description){
        newnote.description=description
    };
    if(tag){
        newnote.tag=tag
    };

    // Find the note to be updated and update it
    let note=await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send('Not found');

    }
    if(note.user.toString()!==req.user.id){
        return res.status(401).send('Unauthorised logining and not allowed');

    }
    note=await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
    res.json({note});
    console.log({newnote});


    

    
  })
//   delete A NOTE :using put request /api/auth/delete

  router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    const {title,description,tag}=req.body;

    let note=await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send('Not found');
    }

    if(note.user.toString()!==req.user.id){
        return res.status(401).send('Not allowed');
    }

    note=await Note.findByIdAndDelete(req.params.id);
    // res.json({note});
    res.json({"success":"Note has been deleted",note:note});
  })



module.exports=router