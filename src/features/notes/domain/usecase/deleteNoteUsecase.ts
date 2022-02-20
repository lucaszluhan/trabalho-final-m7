import Usecase from '../../../../core/domain/contracts/usecase';
import { CacheRepository } from '../../../../core/infra/repositories/cacheRepository';
import NotesRepository from '../../infra/repositories/notesRepository';
import IdError from '../errors/idError';
import DeleteNoteParams from '../model/deleteNoteParams';

export default class DeleteNoteUsecase implements Usecase {
   constructor(private repository: NotesRepository, private cacheRepo: CacheRepository) {}

   async run(data: DeleteNoteParams) {
      if (data.id.length > 36) {
         throw new IdError();
      }

      this.repository.delete(data.id);

      this.cacheRepo.delete(`note:All${data.userId}`);
   }
}
