import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: [true, 'Please add room title'],
        }, 

        image: {
            type: String,
            required: true,
          },

          description: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
            default: 0,
          },
          isAvailable: {
            type: Boolean,
            default: true,
          },
        
    },
    {
        timestamps:true,
    }
)
const productModel = mongoose.models.product || mongoose.model("product", productSchema )
export default productModel