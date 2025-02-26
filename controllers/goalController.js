const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
// const User = require('../models/userModel')
const Admin = require('../models/adminModel')


//@ desc Get goals
//@ route GET /api/goals
//@ access Private

const getGoals = asyncHandler(async (req, res)=>{
    const goals = await Goal.find({ admin:req.admin.id })
    res.status(200).json(goals)
})

//@ desc Set goal
//@ route POST /api/goals
//@ access Private 

const setGoal = asyncHandler(async (req, res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        admin:req.admin.id,
    })
    res.status(200).json(goal)
})

//@ desc Update goal
//@ route PUT /api/goals/:id
//@ access Private

const updateGoal = asyncHandler(async(req, res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)

        throw new Error('Goal not found')
    }

    // Checking for admin

    if(!req.admin){
        res.status(400)
        throw new Error('User not found')
    }

    // Make sure the looged in user matches the goal admin
    if(goal.admin.toString() !== req.admin.id){
        res.status(401)
        throw new Error('Admin not authorizd')
    }
    const updateGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new:true,

    })
    res.status(200).json(updateGoal)
})

//@ desc Delete Goal
//@ route DELETE /api/goals/:id
//@ access Private

const deleteGoal = asyncHandler(async (req, res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    // Checking for user
    if(!req.admin){
        res.status(400)
        throw new Error('Admin not found')
    }
    // Make sure the logged in user matches the goal user
    if(goal.admin.toString() !== req.admin.id){
        res.status(401)
        throw new Error('Admin not authorized')
    }
    await goal.deleteOne()
    res.status(200).json({id:req.params.id})
})
module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}