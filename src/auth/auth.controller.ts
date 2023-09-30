import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { UserStatusEnum } from 'src/common/enums';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    try {
      const isUser = await this.userService.findOne({
        email: createUserDto.email,
      });

      if (isUser) {
        return 'Account already exists with this email!, go to login';
      }

      const user = await this.userService.create(createUserDto);

      if (!user) return 'fail to create user';

      return user;
    } catch (error) {
      return error;
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;

      const isUser = await this.userService.findOne({ email: email });

      if (!isUser) {
        return 'User not found with this email';
      }

      //Check if block
      if (isUser.userStatus === UserStatusEnum.BLOCKED) {
        return 'You are blocked by admin please contact hello.bytescode@gmail.com';
      }
      return 'loggin';
      //Validate password
      let validatedUser = await this.authService.validateUser(email, password);

      if (!validatedUser) {
        return 'Email or password incorrect';
      }

      //Increment login count
      await this.userService.updateLoginCount(
        isUser._id.toString(),
        validatedUser.loginCount,
      );

      // Create token
      const { accessToken, cookieToken } = await this.authService.createToken(
        isUser,
      );
      return { validatedUser, accessToken };
    } catch (error) {
      return error;
    }
  }
}
