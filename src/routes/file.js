import express from 'express';
import { getFiles, getPresignedUrl, getPresignedUrlGetObject, removeFile, uploadFile } from '../controller/file.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/upload', authMiddleware ,uploadFile);
router.get('/get', authMiddleware , getFiles);
router.get('/presigned-url', authMiddleware , getPresignedUrl);
router.get('/download', authMiddleware , getPresignedUrlGetObject);
router.delete('/remove', authMiddleware , removeFile);

export default router;