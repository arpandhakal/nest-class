import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  role: string;

  @Prop()
  password: string;

  @Prop()
  githubusername: string;

  @Prop()
  githubavatar: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
