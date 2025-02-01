import { Role } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import { SessionController } from "./session.controller";

const router = Router();

router.get("/", SessionController.getAll);
router.get("/:id", SessionController.getOne);
router.post("/", auth(Role.LEARNER, Role.TEACHER), SessionController.create);
router.patch("/:id", auth(Role.TEACHER, Role.LEARNER), SessionController.update);
router.delete("/:id", SessionController.remove);

export const SessionRoutes = router;
