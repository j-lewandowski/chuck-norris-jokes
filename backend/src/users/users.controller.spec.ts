import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockService = {
    create: jest.fn((dto) => {
      return {
        id: 'mockId',
        ...dto,
      };
    }),

    findAll: jest.fn(() => [
      { id: '1', email: 'user1@test.com', password: 'pass1' },
      { id: '2', email: 'user2@test.com', password: 'pass2' },
    ]),

    findOne: jest.fn((id) => ({
      id,
      email: 'user@test.com',
      password: '12345',
    })),

    remove: jest.fn().mockResolvedValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    expect(
      controller.create({ email: 'test@email.com', password: '12345' }),
    ).toEqual({
      id: expect.any(String),
      email: 'test@email.com',
      password: '12345',
    });
  });

  it('should return an array of users', () => {
    expect(controller.findAll()).toEqual([
      { id: '1', email: 'user1@test.com', password: 'pass1' },
      { id: '2', email: 'user2@test.com', password: 'pass2' },
    ]);
    expect(mockService.findAll).toHaveBeenCalled();
  });

  it('should return a single user', () => {
    const userId = '1';

    expect(controller.findOne(userId)).toEqual({
      id: userId,
      email: 'user@test.com',
      password: '12345',
    });
    expect(mockService.findOne).toHaveBeenCalledWith(userId);
  });

  it('should remove the user', () => {
    const userId = '1';

    expect(controller.remove(userId)).resolves.toEqual({});
    expect(mockService.remove).toHaveBeenCalledWith(userId);
  });
});
