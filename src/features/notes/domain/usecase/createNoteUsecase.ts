import { randomUUID } from 'crypto';
import Usecase from '../../../../core/domain/contracts/usecase';
import { CacheRepository } from '../../../../core/infra/repositories/cacheRepository';
import NotesRepository from '../../infra/repositories/notesRepository';
import IdError from '../errors/idError';
import LengthError from '../errors/lengthError';
import CreateNotesParams from '../model/createNoteParams';

export default class CreateNoteUsecase implements Usecase {
   constructor(private repository: NotesRepository, private cacheRepo: CacheRepository) {}

   async run(params: CreateNotesParams) {
      if (params.detail.length > 500) {
         throw new LengthError();
      }

      if (params.description.length > 50) {
         throw new LengthError();
      }

      if (params.id.length != 36) {
         throw new IdError();
      }

      await this.repository.create({
         uid: randomUUID(),
         description: params.description as string,
         detail: params.detail as string,
         user_uid: params.id as string,
      });

      await this.cacheRepo.delete(`note:All${params.id}`);
   }
}
