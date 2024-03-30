import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(private jwtService: JwtService) {}

  async generateToken(data: any) {
    return this.jwtService.sign(data);
  }
}
