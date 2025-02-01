import { Role } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import { SkillController } from "./skill.controller";

const router = Router();

router.get("/", auth(Role.TEACHER, Role.LEARNER, Role.ADMIN), SkillController.getAll);
router.get("/:id", SkillController.getOne);
router.post("/", auth(Role.TEACHER), SkillController.create);
router.patch("/:id", auth(Role.TEACHER), SkillController.update);
router.delete("/:id", auth(Role.TEACHER), SkillController.remove);

export const SkillRoutes = router;
