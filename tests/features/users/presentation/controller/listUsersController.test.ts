import DatabaseConnection from '../../../../../src/core/infra/database/connections/connections';
import { RedisConnection } from '../../../../../src/core/infra/database/connections/redis';
import { createServer } from '../../../../../src/core/presentation/server/server';
import request from 'supertest';

describe('list users controller tests', () => {
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

   test('should return ok if there is any user', async () => {
      await request(app)
         .get('/users')
         .expect(200)
         .expect((response) => {
            expect(response.body.ok).toBe(true);
            expect(response.body.msg).toEqual('Usuarios listados.');
         });
   });
});
