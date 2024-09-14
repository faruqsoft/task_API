import express from "express";
const router = express.Router();

import * as tasksController from "../app/controllers/tasksController.js";
import * as usersController from "../app/controllers/usersController.js";
import authMiddleware from "../app/middlewares/authMiddleware.js";



//users
router.post("/registration",usersController.registration);
router.post("/login",usersController.login);
router.get("/profiledetails",authMiddleware,usersController.profileDetails);
router.post("/Profileupdate",authMiddleware,usersController.ProfileUpdate);
router.get("/emailverify/:email",usersController.emailVerify);
router.post("/codeverify",usersController.codeVerify);
router.post("/resetpassword",usersController.resetPassword);

//Task
router.post("/createtask",authMiddleware,tasksController.createTask);
router.put("/updatetaskstatus/:id/:status",authMiddleware,tasksController.updateTaskStatus);
router.get("/tasklistbystatus/:status",authMiddleware,tasksController.taskListByStatus);
router.delete("/deletetask/:id",authMiddleware,tasksController.deleteTask);
router.get("/counttask",authMiddleware,tasksController.countTask);


export default router;