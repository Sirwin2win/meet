import express from "express";
const paystackRouter = express.Router()
import {toPaystack} from "../controllers/paystackController.js";




paystackRouter.post('/api/paystack/create-checkout-session', toPaystack);

export default paystackRouter;