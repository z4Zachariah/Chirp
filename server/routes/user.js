import express from "express";
const router = express.Router();

import { signin, signup } from "../controllers/user.js";

//These are the routes used by the Auth system 
//Express will decide upon which action to take dependant upon the address provided

router.post("/signin", signin);
router.post("/signup", signup);

export default router;