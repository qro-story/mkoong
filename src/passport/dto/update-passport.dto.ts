import { PartialType } from '@nestjs/swagger';
import { CreatePassportDto } from './passport.dto';

export class UpdatePassportDto extends PartialType(CreatePassportDto) {}
