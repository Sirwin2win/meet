const mongoose = require('mongoose')
const categorySchema = mongoose.Schema(
    {
        name:{
            type:String,
            required: [true, 'Please add Category name'],
        }, 
    },
    {
        timestamps:true,
    }
)
module.exports = mongoose.model('Category', categorySchema)