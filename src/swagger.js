import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'File Sharing API',
            version: '1.0.0',
            description: '파일 공유 API 서버',
        },
    },
    apis: ['./src/routes/*.js', './src/controller/*.js'],
};

const specs = swaggerJSDoc(options);

export { specs, swaggerUi };