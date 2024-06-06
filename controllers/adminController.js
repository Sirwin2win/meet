const jwt = require("jsonwebtoken");
const  bcrypt = require("bcryptjs");
const asyncHandler = require('express-async-handler');
const User = require('../models/adminModel');


//@desc Register new Admin
//@route POST /api/admins
//@access Public

const registerAdmin = asyncHandler(async (req, res)=>{
    const { name, email, password } = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please fill all fields');
    }

    // Checking if admin exists

    const adminExists = await Admin.findOne({email})
    if(adminExists){
        res.status(400)
        throw new Error('Email already exists on the database')
    }
    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    // Create Admin

    const admin = await Admin.create({
        name,
        email,
        password: hashedPassword,
    })
    if(admin){
        res.status(201).json({
            _id : admin.id,
            name : admin.name,
            email : admin.email,
            token : generateToken(admin._id),
        })
    }else {
        res.status(400)
        throw new Error('Invalid admin data')
    }
})


// @desc Authenticate a admin
//@ route POST /api/admins/login
// @ access Public

const loginAdmin = asyncHandler(async (req, res)=>{
    const {email, password} = req.body

    // Checking if email exists
    const admin = await Admin.findOne({email})
    if(admin && (await bcrypt.compare(password, admin.password))){
        res.json({
            _id: admin.id,
            name : admin.name,
            email : admin.email,
            token : generateToken(admin._id),
        })
    }else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

})

//@ desc Get admin data
//@ route GET /api/admins/me
//@ access Private

const getMe = asyncHandler(async (req,res)=>{
    res.status(200).json(req.admin)
})
// Generate JWT

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn : '30d'

    })
}
module.exports = {
    registerAdmin,
    loginAdmin,
    getMe,
}




