const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();
const prisma = require("../../lib/prisma");
const email_sender = require("../../config/emailSender");

//List all users
const getAllusers = asyncHandler(async(req, res)=>{
    const users = await prisma.user.findMany();
    res.json(users);
})

const changeRole = asyncHandler(async(req, res)=>{
    const {email, role} = req.body;
    const user = await prisma.user.findUnique({where: {email}});
    if(user){
        await prisma.user.update({where: {email}, data: {role}});
        res.json({message: "Role updated successfully"});
    }
})