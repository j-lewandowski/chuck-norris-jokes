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
    ).toEqual({
      id: expect.any(String),
      email: 'test@email.com',
      password: '12345',
    });
  });

  it('should find all users', () => {
    // Assuming create method works as expected
    service.create({ email: 'user1@test.com', password: 'password1' });
    service.create({ email: 'user2@test.com', password: 'password2' });

    const users = service.findAll();
    expect(users.length).toBeGreaterThanOrEqual(2);
  });

  it('should find a user by ID', () => {
    // Assuming create method works as expected
    const createdUser = service.create({
      email: 'user1@test.com',
      password: 'password1',
    });

    const foundUser = service.findOne(createdUser.id);
    expect(foundUser).toMatchObject({
      id: expect.any(String),
      email: 'user1@test.com',
      password: 'password1',
    });
  });

  it('should throw an error if user not found by ID', () => {
    expect(() => {
      service.findOne('non-existing-id');
    }).toThrow('User not found');
  });

  it('should remove a user by ID', () => {
    // Assuming create method works as expected

    const createdUser = service.create({
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
