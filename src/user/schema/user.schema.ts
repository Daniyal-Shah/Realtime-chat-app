import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  bio: string;

  @Prop({
    type: String,
    required: true,
    length: 8,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({ type: Date, default: Date.now() })
  createdDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User).pre(
  'save',
  async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  },
);
