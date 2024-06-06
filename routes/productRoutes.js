import express from 'express';
import multer from 'multer';
const productRouter = express.Router();
import {createProduct, getProducts, getProduct, removeProduct} from '../controllers/productController.js';


// app.post('/', upload.single('image'), (req, res, next) )
// Initializing Multer
const storage = multer.diskStorage({
    destination: "uploads",
    filename:(req, file, cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
});
const upload = multer({ storage: storage });
// Routes
productRouter.get('/', getProducts);
productRouter.get('/:id', getProduct);
productRouter.post('/', upload.single('image'), createProduct);
// productRouter.put('/:id', upload.single('image'), updatedProduct);
productRouter.post('/remove', removeProduct);

export default productRouter;