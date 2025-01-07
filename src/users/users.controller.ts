import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/types';
import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @UseGuards(AuthGuard)
  @Roles(Role.PowerUser)
  @Get()
  getAvailableUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Roles(Role.PowerUser)
  @Post()
  postUser(@Body() user: User) {
    return this.usersService.saveUser(user);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.PowerUser)
  @Patch()
  triggerProWatchUserPull() {
    return this.usersService.pullFromProWatch();
  }
}
