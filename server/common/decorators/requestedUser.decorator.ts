import { createParamDecorator } from '@nestjs/common';

export const RequestedUser = createParamDecorator((data, req) => {
    return req.requestedUser;
});
