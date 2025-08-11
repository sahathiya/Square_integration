import express from "express";
import { submitPayment } from "../controllers/orderController";
export const paymentRoute=express.Router()

paymentRoute
.post('/pay',submitPayment)

