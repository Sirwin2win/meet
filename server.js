import express from "express";
import colors from "colors";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config.js";
// dotenv.config()
// import { errorHandler } from './middleware/errorMiddleware';
import { connectDB } from "./config/db.js";
import bodyParser from "body-parser";
import path from "path";
import multer from "multer";
import productRouter from "./routes/productRoutes.js";
import paystackRouter from "./routes/paystackRoutes.js";
const PORT = process.env.PORT;

// Initializing database connection
connectDB();

// Initializing express
const app = express();

// Initializing middleware
// app.use(express.static(__dirname, 'uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// app.use(cookieParser());

// Routes
// app.use('/api/goals', require('./routes/goalRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/admins', require('./routes/adminRoutes'));
app.use("/api/products", productRouter);
app.use("/api/paystack", paystackRouter);
app.use("/images", express.static("uploads"));

// app.use(errorHandler);
// Listening for connection
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
