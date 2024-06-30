import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  const mockService = {
    create: jest.fn((dto) => {
      return {
        id: 'mockId',
        email: dto.email,
      };
    }),

    findAll: jest.fn(() => [
      { id: '1', email: 'user1@test.com' },
      { id: '2', email: 'user2@test.com' },
    ]),

    findOne: jest.fn((id) => ({
      id,
      email: 'user@test.com',
      password: 'hashedPassword',
    })),
  };

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Adjusting the test for creating a user
  it('should create a user', async () => {
    await expect(
      controller.create({ email: 'test@email.com', password: '12345' }),
    ).resolves.toEqual({
      id: expect.any(String),
      email: 'test@email.com',
    });
  });

  // Adjusting the test for returning an array of users
  it('should return an array of users', async () => {
    await expect(controller.findAll()).resolves.toEqual([
      { id: '1', email: 'user1@test.com' },
      { id: '2', email: 'user2@test.com' },
    ]);
  });

  // Adjusting the test for returning a single user
  it('should return a single user', async () => {
    const userId = '1';
    await expect(controller.findOne(userId)).resolves.toEqual({
      id: userId,
      email: 'user@test.com',
      password: expect.any(String),
    });
  });
});
