import UserRepository from '../../../../../src/features/users/infra/repositories/usersRepository';
import CreateUserUsecase from '../../../../../src/features/users/domain/usecase/createUserUsecase';
import DatabaseConnection from '../../../../../src/core/infra/database/connections/connections';
import usuarioExiste from '../../../../../src/features/users/domain/errors/usuarioExiste';

describe('create user usecase tests', () => {
   jest.mock('../../../../../src/features/users/infra/repositories/usersRepository');

   const makeSut = () => {
      const userRepo = new UserRepository();

      const sut = new CreateUserUsecase(userRepo);
      return sut;
   };

   beforeAll(async () => {
      await DatabaseConnection.initConnection();
   });

   afterAll(async () => {
      await DatabaseConnection.closeConnection();
   });

   beforeEach(() => {
      jest.clearAllMocks();
   });

   test('should return 403 usuario existe', async () => {
      jest.spyOn(UserRepository.prototype, 'findUser').mockResolvedValue([{ uid: 'any_uid', name: 'any_name', password: 'any_password', notes: [], created_at: new Date() }]);
      const sut = makeSut();

      try {
         await sut.run({
            name: 'any_name',
            password: 'any_password',
         });
      } catch (error) {
         expect(error).toBeInstanceOf(usuarioExiste);
      }
   });
});
