import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  const prismaMockService = {
    user: {
      count: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prismaMockService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto = {
      email: 'email@email.com',
      password: 'testpassword',
    };

    prismaMockService.user.create.mockResolvedValue(createUserDto);

    const response = await service.create(createUserDto);
    expect(prismaMockService.user.create).toHaveBeenCalledTimes(1);
    expect(response).toMatchObject({
      email: createUserDto.email,
    });
  });

  it('should throw an error if user with the same email already exists', async () => {
    prismaMockService.user.create.mockResolvedValueOnce({
      email: 'user1@test.com',
      password: 'password1',
    });

    await service.create({ email: 'user1@test.com', password: 'password1' });

    prismaMockService.user.create.mockRejectedValueOnce(
      new Error('User with this email already exists'),
    );

    await expect(
      service.create({ email: 'user1@test.com', password: 'password2' }),
    ).rejects.toThrow('User with this email already exists');
  });

  it('should find all users', async () => {
    prismaMockService.user.findMany.mockResolvedValue([
      { email: 'user1@test.com', password: 'password1' },
      { email: 'user2@test.com', password: 'password2' },
      { email: 'user3@test.com', password: 'password3' },
      { email: 'user4@test.com', password: 'password4' },
    ]);

    const users = await service.findAll();

    expect(users.length).toBe(4);
  });

  it('should find a user by email', async () => {
    const mockUser = {
      email: 'user3@test.com',
      password: 'password1',
    };
    prismaMockService.user.findUnique.mockResolvedValue({
      id: 'uuid',
      email: 'email@email.com',
    });
    const foundUser = await service.findOne(mockUser.email);
    expect(foundUser).toMatchObject({
      id: expect.any(String),
      email: 'email@email.com',
    });
  });

  it('should throw an error if user not found by email', async () => {
    prismaMockService.user.findUnique.mockResolvedValue(null);
    await expect(service.findOne('non-existing-email')).resolves.toBeNull();
  });
});
