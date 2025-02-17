import fileService from '../service/file.service.js';

export const uploadFile = async (req, res) => {
    try {
        await fileService.uploadFile(req.body);
        res.status(200).send('파일 업로드 성공');
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};

export const getFiles = async (req, res) => {
    try {
        const result = await fileService.getFiles();
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

export const getPresignedUrl = async (req, res) => {
    try {
        const url = await fileService.getPresignedUrl(req.query.name);
        res.status(200).send(url);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

export const getPresignedUrlGetObject = async (req, res) => {
    try {
        const url = await fileService.getPresignedUrlGetObject(req.query.name);
        res.status(200).send(url);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

export const removeFile = async (req, res) => {
    try {
        await fileService.removeFile(req.query);
        res.status(200).send('파일 삭제 성공');
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}