import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'example-Name' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'email@email.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'normal-user' })
  role: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '@#123sada12537' })
  password: string;
}
