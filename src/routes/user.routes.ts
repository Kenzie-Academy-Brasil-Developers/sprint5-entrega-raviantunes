import { Router } from "express";
import UserController from "../controllers/UserController";

const userRouter = Router();

userRouter.get("", UserController.index);
userRouter.get("/:id", UserController.showUser);
userRouter.post("", UserController.store);
userRouter.patch("/:id", UserController.update);
userRouter.delete("/:id", UserController.delete);

export default userRouter;
