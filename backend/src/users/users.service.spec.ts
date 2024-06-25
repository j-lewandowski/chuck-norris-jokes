import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', () => {
    expect(
      service.create({ email: 'test@email.com', password: '12345' }),
    ).resolves.toMatchObject({
      id: expect.any(String),
      email: 'test@email.com',
    });
  });

  it('should throw an error if user with the same email already exists', async () => {
    await service.create({ email: 'user1@test.com', password: 'password1' });

    await expect(
      service.create({ email: 'user1@test.com', password: 'password2' }),
    ).rejects.toThrow('User with this email already exists');
  });

  it('should find all users', async () => {
    // Assuming create method works as expected
    await service.create({ email: 'user1@test.com', password: 'password1' });
    await service.create({ email: 'user2@test.com', password: 'password2' });

    const users = service.findAll();

    expect(users.length).toBeGreaterThanOrEqual(4);
  });

  it('should find a user by email', async () => {
    // Assuming create method works as expected
    const createdUser = await service.create({
      email: 'user3@test.com',
      password: 'password1',
    });

    const foundUser = service.findOne(createdUser.email);
    expect(foundUser).toMatchObject({
      id: expect.any(String),
      email: 'user3@test.com',
      password: expect.not.stringContaining('password1'),
    });
  });

  it('should throw an error if user not found by email', () => {
    expect(service.findOne('non-existing-email')).toEqual(null);
  });

  it('should remove a user by ID', async () => {
    // Assuming create method works as expected

    const createdUser = await service.create({
      email: 'removeme@test.com',
      password: 'password',
    });

    const beforeRemove = service.findAll().length;
    service.remove(createdUser.id);
    const afterRemove = service.findAll().length;

    expect(afterRemove).toBeLessThan(beforeRemove);
  });

  it('should throw an error if trying to remove a user that does not exist', () => {
    expect(() => {
      service.remove('non-existing-id');
    }).toThrow('User not found');
  });
});
