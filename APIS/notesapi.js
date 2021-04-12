const exp=require("express")
const notesApiObj=exp.Router();
notesApiObj.use(exp.json())
const verifyToken =require("./middlewares/verifyToken")

require("dotenv").config();

notesApiObj.post("/addnote",verifyToken, async(req,res)=>{
    let notesCollectionObj=req.app.get("notesCollectionObj");
    
    let userObj = req.body;

    let success = await notesCollectionObj.insertOne(userObj)
    res.send({message:"notes created"})
})







notesApiObj.get("/getdetails/:username",verifyToken,async(req,res)=>{
    let notesCollectionObj=req.app.get("notesCollectionObj");
    
    let userObj = req.body;

    let notes = await notesCollectionObj.find({username:req.params.username}).toArray();

    res.send({message:"success",notes:notes});
})


notesApiObj.delete("/deletenotes/:id",verifyToken,async(req,res)=>{
    let notesCollectionObj=req.app.get("notesCollectionObj");
    
    let userObj = req.body;

    let success = await notesCollectionObj.deleteOne({id:req.params.id});
    

    res.send({message:"success"});
})
//update

notesApiObj.put("/update", async(req,res)=>{
    let notesCollectionObj=req.app.get("notesCollectionObj");
    
    let notesObj = req.body;


    let success = await notesCollectionObj.updateOne({id:notesObj.id},{$set:{
        title:notesObj.title,
        note : notesObj.note
    }})

    res.send({message:"success"});
})














module.exports=notesApiObj;