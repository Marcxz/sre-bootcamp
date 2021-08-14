import * as jsonwebtoken from 'jsonwebtoken';
import Config from 'config';
import { StatusCodes } from 'http-status-codes';
const crypto = require('crypto');
let config = Config;

const JWT_SECRET = config.JWT_SECRET;
const OPTIONS = {expiresIn: config.COOKIE_EXP.toString()};

export class JwtService {

     getJwt(data) {
        return new Promise((resolve, reject) => {
            jsonwebtoken.sign(data, JWT_SECRET, OPTIONS, (err, token) => {
                err ? reject(err) : resolve(token);
            });
        });
     }
     
     decodeJwt(jwt) {
        return new Promise((res, rej) => {
            jsonwebtoken.verify(jwt, JWT_SECRET, (err, decoded) => {
                return err ? rej(this.VALIDATION_ERROR) : res(decoded);
            });
        });
    }

     async isAuth(req, res, next) {
        try {
            const jwt = req.headers.authorization.replace('Bearer ', '');
            let user = jsonwebtoken.verify(jwt, JWT_SECRET);
            if(user) {
                req.user = user;
                next();
            } else {
                res.status(StatusCodes.FORBIDDEN).send('Error: Invalid Token');
            }
        } catch(error) {
            res.status(StatusCodes.FORBIDDEN).send('Error: Invalid Token');
        }
    }

    async hashPassword(user) {
        const hash = this.PasswordHashAndSalt(user.plainPassword, user.salt);
        return hash;
    }
     
    
    sha512 (password, salt) {
        const hash = crypto.createHmac('sha512', salt);
        hash.update(password);
        const value = hash.digest('hex');
        return {
          salt: salt,
          passwordHash: value
        };
    }
      
    passwordHashAndSalt(password, salt) {
        const passwordData = this.sha512(password, salt);     
        return passwordData;
    }
}