const express = require("express");
const multer=require('multer')
const path=require('path')
const Photo=require("../models/photo")
const User=require("../models/user")
const Gallery=require("../models/gallery")
const passport = require("passport");
const router = express.Router();

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'files')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})
const upload=multer({storage:storage})

router.post("/add",upload.array('files'),
    passport.authenticate("jwt", { session: false }),
    async (req,res)=>{
    await Promise.all(req.files.map(async (file) => {
        const filePath = `${file.destination}/${file.originalname}`
        return await Gallery.create({
            UserId: req.user.id,
            Photos: [{
                name: file.originalname,
                image:filePath,
                PhotoGallery: {
                    selfGranted: true
                }
            }]
        }, {
            include: Photo
        });
    }))
        const result = await Gallery.findAll({
            where: { UserId: req.user.id },
            include: Photo
        });
    return res.status(200).json(result)
})

router.get("/get",passport.authenticate("jwt", { session: false }),
    async (req,res)=>{
    const data=await Gallery.findAll({
        where: { UserId: req.user.id },
        include: Photo
    });
        return res.status(200).json(data)
    })
router.get("/find/",passport.authenticate("jwt", { session: false }),
    async (req,res)=>{
        const name=req.query.name
        const data=await Gallery.findAll({ include: [{
            model:Photo,
            where:{name:name}
            }],where:{
            UserId:req.user.id,

        }})
        return res.status(200).json(data)
    })
module.exports=router
