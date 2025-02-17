import express from 'express';
import { authenticateUser, loginUser, logoutUser, refreshAccessToken, registerUser } from '../controller/user.controller.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/auth', authenticateUser);
router.post('/logout', logoutUser);
router.post('/refresh', refreshAccessToken);

export default router;