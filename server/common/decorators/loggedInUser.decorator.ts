import { createParamDecorator } from '@nestjs/common';

export const LoggedInUser = createParamDecorator((data, req) => {
    return req.user;
});
