const mongoose = require('mongoose')
const profileSchema = mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        photo:{
            type:String,
        }, 

        phone:{
            type:Number,
        },
    },
    {
        timestamps:true,
    }
)
module.exports = mongoose.model('Profile', profileSchema)