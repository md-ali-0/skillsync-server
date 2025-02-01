import { Role } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import { AvailabilityController } from "./availability.controller";

const router = Router();

router.get("/", auth(Role.TEACHER, Role.LEARNER, Role.ADMIN), AvailabilityController.getAll);
router.get("/:id", AvailabilityController.getOne);
router.post("/", auth(Role.TEACHER), AvailabilityController.create);
router.patch("/:id", auth(Role.TEACHER), AvailabilityController.update);
router.delete("/:id", auth(Role.TEACHER), AvailabilityController.remove);

export const AvailabilityRoutes = router;
