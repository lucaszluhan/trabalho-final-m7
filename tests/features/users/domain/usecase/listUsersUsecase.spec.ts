import UserRepository from '../../../../../src/features/users/infra/repositories/usersRepository';
import ListUsersUsecase from '../../../../../src/features/users/domain/usecase/listUsersUsecase';
import DatabaseConnection from '../../../../../src/core/infra/database/connections/connections';
import NotFoundError from '../../../../../src/core/domain/errors/notFoundError';
import Notes from '../../../../../src/core/infra/database/entities/notes';

describe('create user usecase tests', () => {
   jest.mock('../../../../../src/features/users/infra/repositories/usersRepository');

   const makeSut = () => {
      const userRepo = new UserRepository();

      const sut = new ListUsersUsecase(userRepo);
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
      jest.spyOn(UserRepository.prototype, 'list').mockResolvedValue(undefined);
      const sut = makeSut();
      expect.assertions(2);

      try {
         await sut.run();
      } catch (error) {
         expect(error).toBeInstanceOf(NotFoundError);
         const err = error as NotFoundError;
         expect(err.message).toEqual('Users not found.');
      }
   });

   test('should return Users[] if find all users', async () => {
      let note: Notes[] = [{ uid: 'any', user_uid: 'any', created_at: new Date(), updated_at: new Date(), detail: 'any', description: 'any' }];
      let user = {
         uid: 'any_uid',
         name: 'any_name',
         password: 'any_password',
         notes: note,
         created_at: new Date(),
      };

      jest.spyOn(UserRepository.prototype, 'list').mockResolvedValue([user]);
      const sut = makeSut();

      const users = await sut.run();
      expect(users).toBeTruthy();
      expect(users[0].name).toBe(user.name);
   });
});
