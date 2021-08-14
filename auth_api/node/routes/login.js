import { loginFunction,  } from '../services/login';
import { StatusCodes } from 'http-status-codes';
export const login = async (req, res, next) => {
  try {
    let username = req.body.username;
    let password = req.body.password;
    const data = await loginFunction(username, password);
    if (data) {
      res.status(StatusCodes.OK).send({
        data: data
      });
    } else {
      res.status(StatusCodes.FORBIDDEN).send({
        message: 'invalid user and password'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: 'Internal Error in the API'
    });
  }
}
