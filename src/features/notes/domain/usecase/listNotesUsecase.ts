import Usecase from '../../../../core/domain/contracts/usecase';
import NotFoundError from '../../../../core/domain/errors/notFoundError';
import { CacheRepository } from '../../../../core/infra/repositories/cacheRepository';
import NotesRepository from '../../infra/repositories/notesRepository';
import IdError from '../errors/idError';
import ListNotesParams from '../model/listNotesParams';
import INotes from '../model/notesInterface';

export default class ListNotesUsecase implements Usecase {
   constructor(private repository: NotesRepository, private cacheRepo: CacheRepository) {}

   async run(data: ListNotesParams) {
      if (data.userId.length > 36) {
         throw new IdError();
      }

      let cachedNotes = await this.cacheRepo.get(`note:All${data.userId}`);

      if (cachedNotes) {
         return JSON.parse(cachedNotes);
      }

      let notes = await this.repository.list(data.userId);

      if (!notes) {
         throw new NotFoundError('Notes');
      }

      await this.cacheRepo.set(`note:All${data.userId}`, JSON.stringify(notes));

      return notes;
   }
}
