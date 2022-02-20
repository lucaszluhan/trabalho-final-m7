import DatabaseConnection from '../../../../../src/core/infra/database/connections/connections';
import request from 'supertest';
import { RedisConnection } from '../../../../../src/core/infra/database/connections/redis';
import { createServer } from '../../../../../src/core/presentation/server/server';
import { makeNotes } from '../../../../helpers/makeNotes';

describe('delete note controller tests', () => {
   let app: Express.Application;

   beforeAll(async () => {
      await DatabaseConnection.initConnection();
      RedisConnection.initConnection();

      app = createServer();
   });

   afterAll(async () => {
      await DatabaseConnection.closeConnection();
      RedisConnection.closeConnection();
   });

   test('should return 200 if delete note', async () => {
      const { note, user } = await makeNotes('deleteNoteTest');

      await request(app)
         .delete(`/notes/${note.uid}/${user.uid}`)
         .expect((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toEqual('Nota deletada com sucesso.');
         });
   });
});
