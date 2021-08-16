import { login } from './login';
import { protect } from './protected';
import { health } from '../services/health';
import { JwtService } from '../services/jwtService';
const jwtService = new JwtService();

export const init = async (app) => {
  app.post('/login', login);
  app.get('/protected', jwtService.isAuth, protect);
  app.get('/_health', jwtService.isAuth, health);
};
