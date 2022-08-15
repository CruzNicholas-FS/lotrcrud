const express=require("express");
const router=express.Router();

const Character=require("../models/character");

const getCharacter = async (req, res, next)=>{
    let character;
    try {
        character=await Character.findById(req.params.id)
        if (character===null) {
            res.status(404).json({message:"Character Not Found"})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    res.character=character;
    next();
}

router.get("/", async (req, res)=>{
    try {
        const students = await Character.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

router.get("/:id", getCharacter, async (req, res)=>{
    res.json(res.character);
})

router.post("/", async (req, res)=>{
    const character=new Character({
        name:req.body.name,
        race:req.body.race
    })
    try {
        const newCharacter=await character.save();
        res.status(201).json(newCharacter)
    } catch (error) {
        res.status(400).json({message:error.message})
    }

})

router.patch("/:id", getCharacter, async (req, res)=>{
    if (req.body.name!=null) {
        res.character.name=req.body.name
    }
    if (req.body.race!=null) {
        res.character.race=req.body.race
    }
    try {
        const updatedStudent=await res.character.save();
        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

router.delete("/:id", getCharacter, async (req, res)=>{
    try {
        await res.character.remove();
        res.json({message:"Removed character"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

module.exports=router;