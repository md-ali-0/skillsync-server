import { Role } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { upload } from "../../../config/multer.config";
import auth from "../../middlewares/auth";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/", auth(Role.ADMIN), userController.getAllFromDB);
router.get("/teachers", userController.getAllTeachersFromDB);

router.get(
    "/me",
    auth(Role.ADMIN, Role.TEACHER, Role.LEARNER),
    userController.getMyProfile
);

router.put(
    "/me",
    auth(Role.ADMIN, Role.TEACHER, Role.LEARNER),
    upload.fields([{ name: "avatar", maxCount: 1 }]),
    (req: Request, res: Response, next: NextFunction) => {
        if (req.body.data) {
            req.body = JSON.parse(req.body.data);
        }
        next();
    },
    userController.updateMyProfie
);

router.patch(
    "/:id",
    auth(Role.ADMIN),
    upload.fields([{ name: "avatar", maxCount: 1 }]),
    (req: Request, res: Response, next: NextFunction) => {
        if (req.body.data) {
            req.body = JSON.parse(req.body.data);
        }
        next();
    },
    userController.update
);

router.delete("/:id", auth(Role.ADMIN), userController.DeleteUser);

export const userRoutes = router;
