import { BadRequestException } from '@nestjs/common';
import { MongoIdTransform } from './mongo-id.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import MongoIdDTO from './mongo-id.dto';

describe('MongoIdTransform', () => {
  it('should return the value if it is a valid MongoId', () => {
    const validId = '61d9cfbf17ed7311c4b3e485';
    const result = MongoIdTransform({ value: validId });

    expect(result).toBe(validId);
  });

  it('should throw BadRequestException if the value is not a valid MongoId', () => {
    const invalidId = 'invalid-mongo-id';

    expect(() => MongoIdTransform({ value: invalidId })).toThrow(
      BadRequestException,
    );
  });
});

describe('MongoIdDTO', () => {
  it('should validate successfully with a valid MongoId', async () => {
    const validId = '61d9cfbf17ed7311c4b3e485';
    const dto = plainToInstance(MongoIdDTO, { id: validId });
    const errors = await validate(dto);

    expect(errors.length).toBe(0);
    expect(dto.id).toBe(validId);
  });

  it('should throw BadRequestException with an invalid MongoId', async () => {
    const invalidId = 'invalid-mongo-id';

    try {
      const dto = plainToInstance(MongoIdDTO, { id: invalidId });
      await validate(dto);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });
});
