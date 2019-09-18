import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotFoundException extends HttpException {
    constructor(message: string, public readonly context: { target: any; method: string }) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
