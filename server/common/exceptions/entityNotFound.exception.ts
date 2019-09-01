import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotFoundException extends HttpException {
    constructor(exception: Error, public readonly context: { target: any; method: string }) {
        super(exception.message, HttpStatus.BAD_REQUEST);
    }
}
