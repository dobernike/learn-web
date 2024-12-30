import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // /auth/signup

  // express style - signup(@Req() req: Request) {
  // @Body('email') email: string,
  // @Body('password', ParseIntPipe)
  // password: string,
  // @HttpCode(HttpStatus.OK) by default 201
  @Post('signup') // return 201
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  // /auth/signin
  @HttpCode(HttpStatus.OK) // return 200
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
