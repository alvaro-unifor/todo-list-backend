import express from "express";
import cors from "cors";

import loginRouter from "./login.router.js";
import taskRouter from "./task.router.js";
import profileRouter from "./profile.router.js";

const router = new express.Router();
router.use(express.json())
router.use(cors())

router.use(loginRouter);
router.use(taskRouter);
router.use(profileRouter);


export default router;
