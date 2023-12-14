import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constrants';

@Injectable()
export default class JwtHelper {
  constructor(private jwtService: JwtService) {}

  createToken(payload: any) {
    return this.jwtService.signAsync(payload);
  }

  verifyToken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });
  }
}
