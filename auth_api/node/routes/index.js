import { login } from './login';
import { protect } from './protected';
import { health } from '../services/health';
import { JwtService } from '../services/jwtService';
import { hashPasswordUsers } from '../services/login';
const jwtService = new JwtService();

export const init = (app) => {

  app.post('/login', login);
  app.get('/protected', jwtService.isAuth, protect);
  app.get('/_health', jwtService.isAuth, health);
};
