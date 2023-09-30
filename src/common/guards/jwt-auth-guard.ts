import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
const jwt = require('jsonwebtoken');

export class JwtAuthGuard extends AuthGuard('jwt') {
  private superCanactivate;
  constructor() {
    // private readonly blacklistService: BlacklistService, // @Inject(BlacklistService)
    super();
    this.superCanactivate = super.canActivate;
  }
  private configService = new ConfigService();

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      await this.superCanactivate(context);
      const authorizationToken = request.headers.authorization.split(' ')[1];

      //Check access token
      if (authorizationToken) {
        let result: any;
        try {
          const accessToken = jwt.verify(
            authorizationToken,
            this.configService.get<string>('JWT_SECRET'),
          );

          if (accessToken) return true;
          else false;
        } catch (error) {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}
