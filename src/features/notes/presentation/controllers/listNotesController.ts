import { Request, Response } from 'express';
import Controller from '../../../../core/presentation/contracts/controller';
import { badRequest, ok, serverError } from '../../../../core/presentation/helpers/httpHandlers';
import ListNotesUsecase from '../../domain/usecase/listNotesUsecase';

export default class ListNotesController implements Controller {
   constructor(private usecase: ListNotesUsecase) {}

   async execute(req: Request, res: Response) {
      try {
         const id = req.params.id;

         if (!id) {
            return badRequest(res, 'Sem valor de ID.');
         }

         let result = await this.usecase.run({ userId: id });

         return ok(res, 'Notas listadas.', result);
      } catch (error) {
         return serverError(res, 'Falha ao listar notas.', error);
      }
   }
}
