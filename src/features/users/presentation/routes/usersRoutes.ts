import { Request, Response, Router } from 'express';
import UsersRepository from '../../infra/repositories/usersRepository';
import ListUsersController from '../controllers/listUsersController';
import CreateUserController from '../controllers/createUserController';
import LoginUserController from '../controllers/loginUserController';
import ListUsersUsecase from '../../domain/usecase/listUsersUsecase';
import CreateUserUsecase from '../../domain/usecase/createUserUsecase';
import LoginUsecase from '../../domain/usecase/loginUsecase';
export default class UsersRoutes {
   static initRoutes(): Router {
      let router = Router();

      // Repositories
      let userRepo = new UsersRepository();
      //Usecases
      let listUsecase = new ListUsersUsecase(userRepo);
      let createUsecase = new CreateUserUsecase(userRepo);
      let loginUsecase = new LoginUsecase(userRepo);
      // Controllers
      let listUsersController = new ListUsersController(listUsecase);
      let createUserController = new CreateUserController(createUsecase);
      let loginUserController = new LoginUserController(loginUsecase);
      // Routes
      router.get('/', (req: Request, res: Response) => {
         listUsersController.execute(req, res);
      });
      router.post('/login', (req: Request, res: Response) => {
         loginUserController.execute(req, res);
      });
      router.post('/create', (req: Request, res: Response) => {
         createUserController.execute(req, res);
      });

      return router;
   }
}
