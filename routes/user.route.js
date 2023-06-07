const express = require('express');
const controller = require("../controllers/user.controller");

//Creating routes with express routes
const userRouter = express.Router();


/*-------------------- New user post Route -----------------------*/
userRouter.post("/user", controller.postUser);


/*-------------- All user get Route with pagination --------------*/
userRouter.get("/user/page/:page", controller.getUser);


/*-------------- Single user get route ---------------------------*/
userRouter.get("/user/:id", controller.getSingleUser);


/*--------------------- user update Route -------------------------*/
userRouter.patch("/user/:id", controller.updateUser);


/*--------------------- user delete Route ------------------------*/
userRouter.delete("/user/:id", controller.deleteUser);

module.exports={
    userRouter
}