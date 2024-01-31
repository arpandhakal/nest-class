import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schema/user.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

interface UserData {
  name: string;
  organization: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  async getUsers(): Promise<any> {
    try {
      const result = await this.usersModel.find().exec();
      return result;
    } catch (err) {
      throw new HttpException(
        'could not handle request',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async postUsers(dto: CreateUserDto) {
    try {
      console.log(dto);
      await this.usersModel.create(dto);
      return { message: 'user created succesfully' };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getUsersById(id: string): Promise<any> {
    try {
      const parsedId = new Types.ObjectId(id);
      const result = await this.usersModel.findById(parsedId).exec();
      return result;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
