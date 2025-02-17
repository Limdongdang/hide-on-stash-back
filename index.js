import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import path from 'path';
import { sequelize } from './src/model/index.js';
import { fileURLToPath } from 'url';
import { specs, swaggerUi } from './src/swagger.js';
import fileRoutes from './src/routes/file.js';
import userRoutes from './src/routes/user.js';
import { initializeMinio } from './src/config/minio.js';
import corsOptions from './src/config/cors.js';
import cookieParser from 'cookie-parser';

import { User } from './src/model/user.model.js';
import { File } from './src/model/file.model.js';

const app = express();
const port = 3000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// swagger UI 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/file', fileRoutes);
app.use('/api/user', userRoutes);

// MySQL 연결
await sequelize.sync({ force: false })
  .then(() => {
    console.log('MySQL 연결 성공');
  })
  .catch((err) => {
    console.error('MySQL 연결 오류:', err);
  });

initializeMinio();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// HTML 폼 라우트
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});