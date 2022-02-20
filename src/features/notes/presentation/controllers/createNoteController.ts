import { Request, Response } from 'express';
import Controller from '../../../../core/presentation/contracts/controller';
import { badRequest, ok, serverError } from '../../../../core/presentation/helpers/httpHandlers';
import CreateNoteUsecase from '../../domain/usecase/createNoteUsecase';

export default class CreateNoteController implements Controller {
   constructor(private usecase: CreateNoteUsecase) {}

   async execute(req: Request, res: Response) {
      try {
         const id = req.params.id;
         const { detail, description } = req.body;

         if (!id) {
            return badRequest(res, 'Sem valor de ID.');
         }
         if (!detail) {
            return badRequest(res, 'Sem valor de detail.');
         }
         if (!description) {
            return badRequest(res, 'Sem valor de description.');
         }

         await this.usecase.run({ detail, description, id });

         return ok(res, 'Nota criada com sucesso.');
      } catch (error) {
         return serverError(res, 'Falha ao criar nota.', error);
      }
   }
}
