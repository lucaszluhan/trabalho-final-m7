import DatabaseConnection from '../../../../../src/core/infra/database/connections/connections';
import request from 'supertest';
import { RedisConnection } from '../../../../../src/core/infra/database/connections/redis';
import { createServer } from '../../../../../src/core/presentation/server/server';
import { makeUsers } from '../../../../helpers/makeUsers';

describe('list notes controller tests', () => {
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

   test('should return 200 if find any user', async () => {
      const user = await makeUsers('listNotesTest');
      await request(app)
         .get(`/notes/${user.uid}`)
         .expect((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toEqual('Notas listadas.');
         });
   });
});
