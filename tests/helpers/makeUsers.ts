import { randomUUID } from 'crypto';
import UsersRepository from '../../src/features/users/infra/repositories/usersRepository';

export const makeUsers = async (name1: string) => {
   const user = {
      uid: randomUUID(),
      name: name1,
      password: 'teste1',
   };

   await new UsersRepository().create(user);

   return user;
};
