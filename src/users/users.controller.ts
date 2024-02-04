import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/allUsers')
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'role', required: false })
  @ApiQuery({ name: 'email', required: false })
  getAllUsers(
    @Query('name') name?: string,
    @Query('role') role?: string,
    @Query('email') email?: string,
  ): any {
    return this.usersService.getUsers(name, email, role);
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
