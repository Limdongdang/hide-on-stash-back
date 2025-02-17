// file.service.js
import { minioClient } from "../config/minio.js";
import { File } from "../model/file.model.js";
import { sequelize } from "../model/index.js";

const getFiles = async () => {
    const files = await File.findAll();
    return files;
}

const uploadFile = async (body) => {
    const { originalname, path, size, mimetype } = body;

    const filename = originalname + Date.now();
    await File.create({
        originalname,
        filename,
        path,
        size,
        mimetype,
    });
}

const removeFile = async (data) => {
    const transaction = await sequelize.transaction();

    try{
        await File.destroy({
            where: {
                id: data.id, 
            },
            transaction,
        });
        
        await minioClient.removeObject('uploads', data.name , (err) => {
            if (err) {
                console.log(err);
            }
        });
    
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

const getPresignedUrl = async (name) => {
    return new Promise((resolve, reject) => {
        minioClient.presignedPutObject('uploads', name, 24 * 60 * 60, (err, url) => {
            if (err) {
                reject(err);
            } else {
                console.log(url);
                const externalUrl = url.replace('http://minio:9000', 'http://localhost:9000');
                resolve(externalUrl);
            }
        })
    })
}

const getPresignedUrlGetObject = async (name) => {
    return new Promise((resolve, reject) => {
        minioClient.presignedGetObject('uploads', name, 60, (err, url) => {
            if (err) {
                reject(err);
            } else {
                const externalUrl = url.replace('http://minio:9000', 'http://localhost:9000');
                resolve(externalUrl);
            }
        })
    })
}
        
export default { getFiles, uploadFile, getPresignedUrl, getPresignedUrlGetObject, removeFile };