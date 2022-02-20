import { Repository } from 'typeorm';
import IUsers from '../../domain/model/usersInterface';
import DatabaseConnection from '../../../../core/infra/database/connections/connections';
import Users from '../../../../core/infra/database/entities/users';

export default class UsersRepository {
   private repository: Repository<Users>;
   constructor() {
      this.repository = DatabaseConnection.getConnection().manager.getRepository(Users);
   }
   async list() {
      return await this.repository.find();
   }
   async create(user: IUsers) {
      await this.repository.insert(user);
   }
   async findUser(name: string) {
      return await this.repository.find({ name: name });
   }
   async clear() {
      await this.repository.clear();
   }
}
