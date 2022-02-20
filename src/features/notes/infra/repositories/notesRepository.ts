import { Repository } from 'typeorm';
import INotes from '../../domain/model/notesInterface';
import DatabaseConnection from '../../../../core/infra/database/connections/connections';
import Notes from '../../../../core/infra/database/entities/notes';

export default class NotesRepository {
   private repository: Repository<Notes>;
   constructor() {
      this.repository = DatabaseConnection.getConnection().manager.getRepository(Notes);
   }

   async list(id: string) {
      return await this.repository.find({
         where: {
            user_uid: {
               uid: id,
            },
         },
      });
   }

   async create(note: INotes) {
      await this.repository.insert(note);
   }

   async update(uid: string, detail: string, description: string) {
      await this.repository.update(uid, {
         detail: detail,
         description: description,
      });
   }

   async delete(uid: string) {
      await this.repository.delete(uid);
   }

   async clear() {
      await this.repository.clear();
   }
}
