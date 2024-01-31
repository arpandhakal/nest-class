import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://arpandhakal20:admin123@projectiii.1t9zvvx.mongodb.net/products',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
