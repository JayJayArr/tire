import { Test, TestingModule } from '@nestjs/testing';
import { RolesGuard } from './roles.guard';
import { JwtService } from '@nestjs/jwt';

describe('RolesGuard', () => {
  let rolesGuard: RolesGuard;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesGuard, JwtService],
    }).compile();

    rolesGuard = module.get(RolesGuard);
  });

  it('should be defined', () => {
    expect(rolesGuard).toBeDefined();
  });
});
