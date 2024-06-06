const asyncHandler = require('express-async-handler')
const Category = require('../models/categoryModel')
const User = require('../models/userModel')


//@ desc Get Category
//@ route GET /api/Category
//@ access Private

const getCategory = asyncHandler(async (req, res)=>{
    const categories = await Category.find()
    res.status(200).json(categories)
})

//@ desc Set goal
//@ route POST /api/Category
//@ access Private 

const setCategory = asyncHandler(async (req, res)=>{
    if(!req.body.name){
        res.status(400)
        throw new Error('Please add a category')
    }

    const category = await Category.Create({
        text: req.body.name,
        user:req.usr.id,
    })
    res.status(200).json(category)
})

//@ desc Update goal
//@ route PUT /api/Category/:id
//@ access Private

const updateCategory = asyncHandler(async(req, res)=>{
    const category = await Category.findById(req.params.id)
    if(!category){
        res.status(400)

        throw new Error('Category not found')
    }

    // Checking for user

    if(!req.user){
        res.status(400)
        throw new Error('User not found')
    }

    // Make sure the looged in user matches the goal user
    if(category.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Usr not authorizd')
    }
    const updateCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new:true,

    })
    res.status(200).json(updateCategory)
})

//@ desc Delete Goal
//@ route DELETE /api/Category/:id
//@ access Private

const deleteCategory = asyncHandler(async (req, res)=>{
    const category = await Category.findById(req.params.id)
    if(!category){
        res.status(400)
        throw new Error('category not found')
    }
    // Checking for user
    if(!req.user){
        res.status(400)
        throw new Error('User not found')
    }
    // Make sure the logged in user matches the goal user
    if(category.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    await category.deleteOne()
    res.status(200).json({id:req.params.id})
})
module.exports = {
    getCategory,
    setCategory,
    updateCategory,
    deleteCategory,
}