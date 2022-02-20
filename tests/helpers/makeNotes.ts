import { randomUUID } from 'crypto';
import NotesRepository from '../../src/features/notes/infra/repositories/notesRepository';
import { makeUsers } from './makeUsers';

export const makeNotes = async (username: string) => {
   const user = await makeUsers(username);

   const note = {
      uid: randomUUID(),
      detail: 'any_detail',
      description: 'any_description',
      user_uid: user.uid,
   };

   await new NotesRepository().create(note);

   return { note, user };
};
