import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.routes';
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
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;