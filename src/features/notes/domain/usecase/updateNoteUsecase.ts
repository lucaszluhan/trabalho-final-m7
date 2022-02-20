import Usecase from '../../../../core/domain/contracts/usecase';
import { CacheRepository } from '../../../../core/infra/repositories/cacheRepository';
import NotesRepository from '../../infra/repositories/notesRepository';
import IdError from '../errors/idError';
import LengthError from '../errors/lengthError';
import UpdateNoteParams from '../model/updateNoteParams';

export default class UpdateNoteUsecase implements Usecase {
   constructor(private repository: NotesRepository, private cacheRepo: CacheRepository) {}

   async run(data: UpdateNoteParams) {
      if (data.detail.length > 500) {
         throw new LengthError();
      }

      if (data.description.length > 50) {
         throw new LengthError();
      }

      if (data.id.length != 36) {
         throw new IdError();
      }

      this.repository.update(data.id, data.detail, data.description);

      this.cacheRepo.delete(`note:All${data.user_id}`);
   }
}
