import userService from "../service/user.service.js";

export const loginUser = async (req, res) => {
    try {
        const result = await userService.loginUser(req.body);

        if(result === null) {
            throw new Error('사용자 정보가 일치하지 않습니다.');
        };

        const accesstoken = userService.generateAccessToken(result);
        const refreshtoken = userService.generateRefreshToken(result);
        
        userService.setCookie(res, 'accessToken', accesstoken);
        userService.setCookie(res, 'refreshToken', refreshtoken);

        res.status(200).send({ user: result.dataValues });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

export const logoutUser = async (req, res) => {
    try {
        userService.clearCookie(res, 'accessToken');
        userService.clearCookie(res, 'refreshToken');

        res.status(200).send('로그아웃 되었습니다.');
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

export const refreshAccessToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        const decoded = userService.verifyToken(token, process.env.REFRESH_TOKEN_SECRET);
        const user = await userService.findUser(decoded.username);
        const newToken = userService.generateAccessToken(user);
        
        userService.setCookie(res, 'accessToken', newToken);

        res.status(200).send({ user: user.dataValues });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const authenticateUser = async (req, res) => {
    try {
        const token = req.cookies.accessToken;
        if(!token) {
            return res.status(403).send('토큰이 없습니다');
        }
        const decoded = userService.verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await userService.findUser(decoded.username);
        
        res.status(200).send({ user: user.dataValues, expiredAt: decoded.exp });
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send('토큰이 만료되었습니다');
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).send('토큰이 유효하지 않습니다');
        } else {
            res.status(500).send('서버 오류가 발생했습니다');
        }
    }
}

export const registerUser = async (req, res) => {
    try {
        if(userService.findUser(req.body.username)) {
            throw new Error('이미 존재하는 사용자입니다.');
        }

        const result = await userService.registerUser(req.body);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

export const sendVerificationEmail = async (req, res) => {
    try {
        const result = await userService.sendVerificationEmail(req.body);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

