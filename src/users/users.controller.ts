import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/allUsers')
  getAllUsers(): any {
    return this.usersService.getUsers();
  }

  @Get('/user/:id')
  getUser(@Param() id: string): any {
    return this.usersService.getUsersById(id);
  }

  @Post('/create-user')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.postUsers(createUserDto);
  }
}
