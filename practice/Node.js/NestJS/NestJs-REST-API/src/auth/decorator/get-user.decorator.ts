import {
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';

//   .switchToWs()
//   .switchToRpc()
//   .getResponse()

export const GetUser = createParamDecorator(
  (
    data: string | undefined,
    ctx: ExecutionContext,
  ) => {
    const request: Express.Request = ctx
      .switchToHttp()
      .getRequest();
    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);
