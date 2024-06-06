const mongoose = require('mongoose')
const goalSchema = mongoose.Schema(
    {
        admin:{
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Admin',
        },
        text:{
            type:String,
            required: [true, 'Please add a text value'],
        }, 
    },
    {
        timestamps:true,
    }
)
module.exports = mongoose.model('Goal', goalSchema)