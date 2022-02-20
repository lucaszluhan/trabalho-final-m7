import UserRepository from '../../../../../src/features/users/infra/repositories/usersRepository';
import LoginUsecase from '../../../../../src/features/users/domain/usecase/loginUsecase';
import DatabaseConnection from '../../../../../src/core/infra/database/connections/connections';
import NotFoundError from '../../../../../src/core/domain/errors/notFoundError';
import Notes from '../../../../../src/core/infra/database/entities/notes';
import senhaIncorreta from '../../../../../src/features/users/domain/errors/senhaIncorreta';

describe('create user usecase tests', () => {
   jest.mock('../../../../../src/features/users/infra/repositories/usersRepository');

   const makeSut = () => {
      const userRepo = new UserRepository();

      const sut = new LoginUsecase(userRepo);
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

   test('should return 404 if there are no users', async () => {
      jest.spyOn(UserRepository.prototype, 'findUser').mockResolvedValue([]);
      const sut = makeSut();
      expect.assertions(2);

      try {
         await sut.run({ name: 'any_name', password: 'any_password' });
      } catch (error) {
         expect(error).toBeInstanceOf(NotFoundError);
         const err = error as NotFoundError;
         expect(err.message).toEqual('User not found.');
      }
   });

   test('should return 403 if password does not match', async () => {
      jest.spyOn(UserRepository.prototype, 'findUser').mockResolvedValue([{ uid: 'any_uid', name: 'any_name', password: 'any_password', notes: [], created_at: new Date() }]);
      const sut = makeSut();

      try {
         await sut.run({ name: 'any_name', password: 'any_wrong_password' });
      } catch (error) {
         expect(error).toBeInstanceOf(senhaIncorreta);
      }
   });
});
