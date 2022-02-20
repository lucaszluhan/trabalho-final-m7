import DatabaseConnection from '../../../../../src/core/infra/database/connections/connections';
import request from 'supertest';
import { RedisConnection } from '../../../../../src/core/infra/database/connections/redis';
import { createServer } from '../../../../../src/core/presentation/server/server';
import { makeNotes } from '../../../../helpers/makeNotes';

describe('update note controller tests', () => {
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

   test('should return 400 if there is no detail', async () => {
      await request(app)
         .put('/notes/:id/:userid')
         .expect((response) => {
            expect(response.statusCode).toBe(400);
            expect(response.body.reason).toEqual('Sem valor de detail.');
         });
   });

   test('should return 400 if there is no description', async () => {
      await request(app)
         .put('/notes/:id/:userid')
         .send({ detail: 'any_detail' })
         .expect((response) => {
            expect(response.statusCode).toBe(400);
            expect(response.body.reason).toEqual('Sem valor de description.');
         });
   });

   test('should return 200 if update note', async () => {
      let { note, user } = await makeNotes('updateNoteTest');

      await request(app)
         .put(`/notes/${note.uid}/${user.uid}`)
         .send({ detail: 'any_detail_edited', description: 'any_description_edited' })
         .expect((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toEqual('Nota alterada com sucesso.');
         });
   });
});
