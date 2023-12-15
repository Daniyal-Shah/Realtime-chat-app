import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import SigninDto from '../dto/signin.dto';
import JwtHelper from '../jwt/jwt.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtHelper: JwtHelper,
  ) {}

  //   Create New User
  async createUser(userDto: User): Promise<User | HttpException> {
    const existingUser = await this.userModel.findOne({ email: userDto.email });
    if (existingUser)
      return new HttpException(
        'Try different email...',
        HttpStatus.BAD_REQUEST,
      );

    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }

  // Get All Users
  async getUsers(): Promise<User[]> {
    return this.userModel.find();
  }

  // Get User By Id
  async getUserById(id: string) {
    const foundUser = await this.userModel.findById(id);

    if (!foundUser)
      throw new HttpException('No such user found', HttpStatus.BAD_REQUEST);

    return foundUser;
  }

  // Remove User By Id
  async removeUserById(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }

  // Signing in user
  async signIn(signinDto: SigninDto) {
    const foundEmailWithEmail = await this.userModel.findOne({
      email: signinDto.email,
    });

    // If no record found with this email
    if (!foundEmailWithEmail)
      return new HttpException(
        'No user found with this email',
        HttpStatus.BAD_REQUEST,
      );

    const passwordMatches = await bcrypt.compare(
      signinDto.password,
      foundEmailWithEmail.password,
    );

    // If password is incorrect
    if (!passwordMatches)
      return new HttpException(
        'Incorrect credentials, Try again...',
        HttpStatus.BAD_REQUEST,
      );

    const payload = {
      sub: foundEmailWithEmail._id,
      email: foundEmailWithEmail.email,
    };

    let result = {
      token: await this.jwtHelper.createToken(payload),
      email: foundEmailWithEmail.email,
      _id: foundEmailWithEmail._id,
      bio: foundEmailWithEmail.bio,
      name: foundEmailWithEmail.name,
    };

    return result;
  }
}
