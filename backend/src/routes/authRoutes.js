import express from "express";
import { login, logout, signup } from "../controllers/authController.js";

const router=express.Router();

router.get("/",(req,res)=>{
    res.send("Auth route hit");
})

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout)

export default router;