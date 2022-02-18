import Usecase from '../../../../core/domain/contracts/usecase';
import NotFoundError from '../../../../core/domain/errors/notFoundError';
import UsersRepository from '../../infra/repositories/usersRepository';

export default class ListUsersUsecase implements Usecase {
   constructor(private repository: UsersRepository) {}

   async run() {
      let users = await this.repository.list();

      if (!users) {
         throw new NotFoundError('Users');
      }

      return users;
   }
}
