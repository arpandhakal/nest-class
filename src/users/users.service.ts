import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schema/user.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { RealtimeService } from 'src/realtime/realtime.service';

interface UserData {
  name: string;
  organization: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    private readonly realTimeService: RealtimeService,
  ) {}

  async getUsers(name?: string, email?: string, role?: string): Promise<any> {
    try {
      interface Query {
        name?: string;
        email?: string;
        role?: string;
      }
      const query: Query = {};
      if (name) {
        query.name = name;
      }
      if (email) {
        query.email = email;
      }
      if (role) {
        query.role = role;
      }
      const result = await this.usersModel.find(query).exec();
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
      const result = await this.usersModel.create(dto);
      const newObj = { date: Date.now(), ...result };
      this.realTimeService.emit('created', newObj);
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
