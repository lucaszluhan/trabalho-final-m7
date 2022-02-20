import DatabaseConnection from '../../../../../src/core/infra/database/connections/connections';
import request from 'supertest';
import { RedisConnection } from '../../../../../src/core/infra/database/connections/redis';
import { createServer } from '../../../../../src/core/presentation/server/server';
import { makeUsers } from '../../../../helpers/makeUsers';

describe('create note controller tests', () => {
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
         .post('/notes/:id')
         .expect((response) => {
            expect(response.statusCode).toBe(400);
            expect(response.body.reason).toEqual('Sem valor de detail.');
         });
   });

   test('should return 400 if there is no description', async () => {
      await request(app)
         .post('/notes/:id')
         .send({ detail: 'any_detail' })
         .expect((response) => {
            expect(response.statusCode).toBe(400);
            expect(response.body.reason).toEqual('Sem valor de description.');
         });
   });

   test('should return 200 if creates new note', async () => {
      let user = await makeUsers('testeCreateNote1');

      await request(app)
         .post(`/notes/${user.uid}`)
         .send({ detail: 'any_detail', description: 'any_description' })
         .expect((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toEqual('Nota criada com sucesso.');
         });
   });
});
