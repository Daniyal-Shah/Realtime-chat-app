import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '../schema/user.schema';
import { UserService } from '../service/user.service';
import SigninDto from '../dto/signin.dto';
import { UserGuard } from '../guard/user.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() userDto: User) {
    return this.userService.createUser(userDto);
  }

  @UseGuards(UserGuard)
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(UserGuard)
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @UseGuards(UserGuard)
  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this.userService.removeUserById(id);
  }

  @Post('signin')
  @UsePipes(new ValidationPipe())
  signIn(@Body() signinDto: SigninDto) {
    return this.userService.signIn(signinDto);
  }
}
