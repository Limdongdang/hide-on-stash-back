import dotenv from 'dotenv';
dotenv.config();

const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204 
};

export default corsOptions;
