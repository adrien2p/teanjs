import { createParamDecorator } from '@nestjs/common';

export const LoggedInUserDecorator = createParamDecorator((data, req) => {
    return req.user;
});
