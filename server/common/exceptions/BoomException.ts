import { HttpException } from '@nestjs/common';

export class BoomException extends HttpException {
    constructor({ output: { statusCode, payload } }: any) {
        super(payload.message, statusCode);
    }
}
