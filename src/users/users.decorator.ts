import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

//This decorator extracts userdate from the token
export const User = createParamDecorator(
  async (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);

// function extractTokenFromHeader(request: Request): string | undefined {
//   const [type, token] = request.headers.authorization?.split(' ') ?? [];
//   return type === 'Bearer' ? token : undefined;
// }
