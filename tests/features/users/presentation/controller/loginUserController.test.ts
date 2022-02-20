import request from 'supertest';
import DatabaseConnection from '../../../../../src/core/infra/database/connections/connections';
import { RedisConnection } from '../../../../../src/core/infra/database/connections/redis';
import { createServer } from '../../../../../src/core/presentation/server/server';
import UsersRepository from '../../../../../src/features/users/infra/repositories/usersRepository';
import { makeUsers } from '../../../../helpers/makeUsers';

describe('login user controller tests', () => {
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

   test('should return bad request 400 if name has no value', async () => {
      await request(app)
         .post('/users/login')
         .send({ password: 'any_password' })
         .expect((response) => {
            expect(response.statusCode).toBe(400);
            expect(response.body.reason).toEqual('Sem valor de name.');
         });
   });

   test('should return bad request 400 if password has no value', async () => {
      await request(app)
         .post('/users/login')
         .send({ name: 'any_name' })
         .expect((response) => {
            expect(response.statusCode).toBe(400);
            expect(response.body.reason).toEqual('Sem valor de password.');
         });
   });

   test('should return ok 200 if users has login', async () => {
      const user = await makeUsers('testelogin1');
      await request(app)
         .post('/users/login')
         .send({ name: user.name, password: user.password })
         .expect((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body.msg).toEqual('Logado com sucesso.');
            expect(response.body.data).toEqual({ uid: user.uid });
         });
   });
});
