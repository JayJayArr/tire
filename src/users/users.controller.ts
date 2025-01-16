import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../types';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';

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
  updateUser(@Body() user: User) {
    return this.usersService.updateUser(user);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.PowerUser)
  @Delete(':id')
  deleteUser(@Param() id: number) {
    return this.usersService.deleteUser(id);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.PowerUser)
  @Patch()
  triggerProWatchUserPull() {
    return this.usersService.pullFromProWatch();
  }
}
