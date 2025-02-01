import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { AvailabilityRoutes } from '../modules/Availability/availability.route';
import { ReviewRoutes } from '../modules/Review/review.route';
import { SessionRoutes } from '../modules/Sessions/session.route';
import { SkillRoutes } from '../modules/Skills/skill.route';
import { userRoutes } from '../modules/User/user.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: userRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/skills',
        route: SkillRoutes
    },
    {
        path: '/sessions',
        route: SessionRoutes
    },
    {
        path: '/availability',
        route: AvailabilityRoutes
    },
    {
        path: '/reviews',
        route: ReviewRoutes
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;