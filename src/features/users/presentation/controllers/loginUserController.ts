import Controller from './../../../../core/presentation/contracts/controller';
import { badRequest, ok, serverError } from './../../../../core/presentation/helpers/httpHandlers';
import { Request, Response } from 'express';
import LoginUsecase from '../../domain/usecase/loginUsecase';

export default class LoginUserController implements Controller {
   constructor(private usecase: LoginUsecase) {}

   async execute(req: Request, res: Response) {
      try {
         const { name, password } = req.body;

         if (!name) {
            return badRequest(res, 'Sem valor de name.');
         }
         if (!password) {
            return badRequest(res, 'Sem valor de password.');
         }

         let data = await this.usecase.run({ name: name, password: password });

         return ok(res, 'Logado com sucesso.', data);
      } catch (error) {
         return serverError(res, 'Falha de login.', error);
      }
   }
}
