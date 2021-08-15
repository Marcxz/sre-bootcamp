import { JwtService } from "./jwtService";
const jwtService = new JwtService();

const users = [
  {
    username: 'admin',
    password: 'cef72039c62a0c1ff655f3a37f13fc9656acf3aab53477acda74f3ab40abc728142a95fe1d373cab8b5842fdf95886cb2cbaa4ba6866a707d2880dfc593d772b',
    salt: 'F^S%QljSfV',
    role: 'admin',
    plainPassword: 'secret',
  },
  {
    username: 'noadmin',
    password: '629f988a62541d947e493ca905805b94aea0aa20ffa4ff98b71f0e5b5a3132edfc1918bfcc5b290a0af4330955a89e155b8f6ad79e9ddafef0536ec7e0b7e0f5',
    salt: 'KjvFUC#K*i',
    role: 'editor',
    plainPassword: 'noPow3r',

  },
  {
    username: 'bob',
    password: 'c7b0868c9b735cb3d7c1c1ea04c06bd0b689afae8901c771bd5d3b67ecd40b6ebbf2ad768ed8a273b0881940d4048fe289bd8a7d4e94e2811534ba006d11377e',
    salt: 'F^S%QljSfV',
    role: 'viewer',
    plainPassword: 'thisIsNotAPasswordBob',
  },
];


export const loginFunction = async (username, password) => {
  // get Users with login 
  // select * from users where login = $[login]';
  let isValid = false;
  let u = null;
  users.map(user => {
    if(user.username === username) {
       let passwordAndHash = jwtService.passwordHashAndSalt(password, user.salt);
       if (passwordAndHash.passwordHash == user.password) {
         isValid = true;
         u = {
           username: user.username,
           password: user.password,
           salt: user.salt,
           role: user.role
         }
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
