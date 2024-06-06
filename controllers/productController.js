// import Product from '../models/productModel';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import productModel from'../models/productModel.js';
// import filename from '../routes/productRoutes'



// Get all Products
const getProducts = async (req, res)=>{
    try {
        const products = await productModel.find({});
        res.status(200).json(products); 
    } catch (error) {
        res.status(500).json({message:error.message}); 
    }   
};

// Get a single Product

const getProduct = async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await productModel.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message}); 
    }
};

// Create New Product

const createProduct = async (req, res)=>{
   let image_filename = `${req.file.filename}`;
   const product = new productModel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    image:image_filename,
   })
   try {

     await product.save();
    res.json({success:true, message: "Room created"})
   } catch (error) {
    console.log(error)
    res.json({success:true, message: "Error"})
    
   }

        
};

// Remove Product Item
const removeProduct = async(req, res)=>{
    try {
        const product = await productModel.findById(req.body.id);
        // Delete Image from the folder
        fs.unlink(`uploads/${product.image}`, ()=>{})
        // Delete data from the database
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: 'Product deleted' })
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

export {createProduct, getProducts, getProduct, removeProduct}



 











