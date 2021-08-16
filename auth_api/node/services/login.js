import { JwtService } from "./jwtService";
const jwtService = new JwtService();
import { DataBase } from '../services/db';

export const loginFunction = async (username, password) => {
  
  let isValid = false;
  let u = null;
  const db = new DataBase();
  const users = await db.query(`select * from users where username = '${username}'`);
  users.map(user => {
       let passwordAndHash = jwtService.passwordHashAndSalt(password, user.salt);
       if (passwordAndHash == user.password) {
         isValid = true;
         u = {
           username: user.username,
           password: user.password,
           salt: user.salt,
           role: user.role
         }
       }
    
  })

  let res = {
    valid: isValid,
    jwt: undefined,
  }

  if(isValid) {
    res.valid = isValid;
    res.jwt = await jwtService.getJwt(u);
  }
  return res;
}

export const hashPasswordUsers = () => {
  users.map(user => {
     console.log(jwtService.hashPassword(user));
  })
}
