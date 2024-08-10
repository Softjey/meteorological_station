import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export default class MongoIdDTO {
  @ApiProperty({
    description: 'Id',
    required: true,
    type: String,
    default: '61d9cfbf17ed7311c4b3e485',
  })
  @IsMongoId()
  @IsString()
  @Transform((value) => MongoIdTransform(value))
  id!: string;
}

export const MongoIdTransform = ({ value }) => {
  if (Types.ObjectId.isValid(value)) {
    return value;
  }

  throw new BadRequestException(`Id ${value} is not a valid MongoId`);
};
