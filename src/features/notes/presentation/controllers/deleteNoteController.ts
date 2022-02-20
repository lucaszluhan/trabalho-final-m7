import { Request, Response } from 'express';
import Controller from '../../../../core/presentation/contracts/controller';
import { badRequest, ok, serverError } from '../../../../core/presentation/helpers/httpHandlers';
import DeleteNoteUsecase from '../../domain/usecase/deleteNoteUsecase';

export default class DeleteNoteController implements Controller {
   constructor(private usecase: DeleteNoteUsecase) {}

   async execute(req: Request, res: Response) {
      try {
         const { id, userId } = req.params;
         if (!id) {
            return badRequest(res, 'Sem valor de ID.');
         }

         this.usecase.run({ id: id, userId: userId });

         return ok(res, 'Nota deletada com sucesso.');
      } catch (error) {
         return serverError(res, 'Falha ao deletar nota.', error);
      }
   }
}
