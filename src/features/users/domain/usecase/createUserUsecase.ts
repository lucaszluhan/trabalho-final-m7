import { randomUUID } from 'crypto';
import Usecase from '../../../../core/domain/contracts/usecase';
import UsersRepository from '../../infra/repositories/usersRepository';
import UsuarioExiste from '../errors/usuarioExiste';
import CreateUserParams from '../model/createUserParams';

export default class CreateUserUsecase implements Usecase {
   constructor(private repository: UsersRepository) {}

   async run(data: CreateUserParams) {
      let user = await this.repository.findUser(data.name);

      if (user[0]) throw new UsuarioExiste(data.name);

      await this.repository.create({
         uid: randomUUID(),
         name: data.name,
         password: data.password,
      });
   }
}
