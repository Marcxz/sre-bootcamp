import { login } from './login';
import { protect } from './protected';
import { health } from '../services/health';
import { JwtService } from '../services/jwtService';
import { DataBase } from '../services/db';
const jwtService = new JwtService();
const db = new DataBase();
export const init = async (app) => {
  app.post('/login', login);
  app.get('/protected', jwtService.isAuth, protect);
  app.get('/_health', jwtService.isAuth, health);
};
