import { Test, TestingModule } from '@nestjs/testing';
import { ProtectedGuard } from './protected.guard';
import { JwtService } from '@nestjs/jwt';

const mockJwtService = {
  verify: jest.fn(),
};

describe('ProtectedGuard', () => {
  let guard: ProtectedGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProtectedGuard,
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    guard = module.get<ProtectedGuard>(ProtectedGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
