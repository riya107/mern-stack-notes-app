const express=require('express')

const fetchuser=require('../middleware/fetchuser')

const bcrypt=require('bcryptjs')

const User=require('../models/User')

const router=express.Router()

const jwt=require('jsonwebtoken')

router.post('/createuser',async (req,res)=>{
    try{
        const salt=await bcrypt.genSalt(10)
        const secPassword=await bcrypt.hash(req.body.password,salt)
        const user=new User({
            name:req.body.name,
            password:secPassword,
            email:req.body.email
        })
        const createUser= await user.save()

        const token=await jwt.sign({_id:createUser._id},process.env.JWT_SECRET)
        res.send({success:true,token:token}) 
    }
    catch(error){
        res.status(400).json({success:false,error:'signup with correct credentials'})
    }
})

router.post('/login',async (req,res)=>{
    try{
        const user=req.body
        const userData=await User.findOne({email:user.email})
        
        if(!userData){
            res.status(400).json({error:'login with correct credentials'})
        }
        else{
    
            const match=await bcrypt.compare(user.password,userData.password)
    
            if(match){
                const token=await jwt.sign({_id:userData._id},process.env.JWT_SECRET)
                res.send({success:true,token:token})           
            }
            else{
                res.status(400).json({success:false,error:'login with correct credentials'})
            }
        }
    }
    catch(error){
        res.status(500).json({success:false,error:'internal sever error'})
    }
})

router.get('/getuser',fetchuser,async (req,res)=>{
    try{
        const _id=req._id
        const user=await User.findById({_id:_id})
        res.send(user)
    }
    catch(error){
        res.status(500).send({error:'internal server error'})
    }
})
module.exports=router