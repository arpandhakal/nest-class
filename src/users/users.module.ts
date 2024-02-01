import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schema/user.schema';
import { RealtimeModule } from 'src/realtime/realtime.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UsersSchema,
      },
    ]),
    RealtimeModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
