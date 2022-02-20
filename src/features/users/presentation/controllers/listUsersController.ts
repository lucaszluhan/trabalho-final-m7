import { Request, Response } from 'express';
import Controller from '../../../../core/presentation/contracts/controller';
import { ok, serverError } from '../../../../core/presentation/helpers/httpHandlers';
import ListUsersUsecase from '../../domain/usecase/listUsersUsecase';

export default class ListUsersController implements Controller {
   constructor(private usecase: ListUsersUsecase) {}

   async execute(req: Request, res: Response) {
      try {
         let result = await this.usecase.run();

         return ok(res, 'Usuarios listados.', result);
      } catch (error) {
         return serverError(res, 'Falha ao listar usuarios.', error);
      }
   }
}
