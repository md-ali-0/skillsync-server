import { Role } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import { ReviewController } from "./review.controller";

const router = Router();

router.get("/", auth(Role.TEACHER, Role.LEARNER, Role.ADMIN), ReviewController.getAll);
router.get("/:id", ReviewController.getOne);
router.post("/", auth(Role.LEARNER), ReviewController.create);
router.patch("/:id", auth(Role.LEARNER), ReviewController.update);
router.delete("/:id", ReviewController.remove);

export const ReviewRoutes = router;
