import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/types';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }
  @UseGuards(AuthGuard)
  @Roles(Role.PowerUser)
  @Get()
  getAvailableUsers() {
    return this.usersService.findAllActive();
  }
}
