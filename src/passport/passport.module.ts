import { forwardRef, Module } from '@nestjs/common';
import { PassportService } from './passport.service';
import { PassportController } from './passport.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportAuth } from '@libs/core/databases/entities/passportauth.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PassportAuth]),
    forwardRef(() => UsersModule),
  ],
  controllers: [PassportController],
  providers: [PassportService],
})
export class PassportModule {}
