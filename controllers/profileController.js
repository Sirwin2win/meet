const asyncHandler = require('express-async-handler')
const Profile = require('../models/profileModel')
const User = require('../models/userModel')


//@ desc Get profile
//@ route GET /api/profile
//@ access Private

const getProfile = asyncHandler(async (req, res)=>{
    const profile = await Profile.find({ user:req.user.id })
    res.status(200).json(profile)
})

//@ desc Set profile
//@ route POST /api/profile
//@ access Private 

const setProfile = asyncHandler(async (req, res)=>{
    const { photo,phone } = req.body
    if(!phone || !photo){
        res.status(400)
        throw new Error('Please add phone and photo')
    }

    const profile = await Profile.Create({
        phone,
        photo,
        user:req.usr.id,
    })
    res.status(200).json(profile)
})

//@ desc Update profile
//@ route PUT /api/profiles/:id
//@ access Private

const updateProfile = asyncHandler(async(req, res)=>{
    const profile = await Profile.findById(req.params.id)
    if(!profile){
        res.status(400)

        throw new Error('profile not found')
    }

    // Checking for user

    if(!req.user){
        res.status(400)
        throw new Error('User not found')
    }

    // Make sure the looged in user matches the profile user
    if(profile.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Usr not authorizd')
    }
    const updateProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new:true,

    })
    res.status(200).json(updateProfile)
})

//@ desc Delete profile
//@ route DELETE /api/profiles/:id
//@ access Private

const deleteProfile = asyncHandler(async (req, res)=>{
    const profile = await Profile.findById(req.params.id)
    if(!profile){
        res.status(400)
        throw new Error('profile not found')
    }
    // Checking for user
    if(!req.user){
        res.status(400)
        throw new Error('User not found')
    }
    // Make sure the logged in user matches the profile user
    if(profile.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    await profile.deleteOne()
    res.status(200).json({id:req.params.id})
})
module.exports = {
    getProfile,
    setProfile,
    updateProfile,
    deleteProfile,
}