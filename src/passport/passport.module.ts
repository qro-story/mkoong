import { forwardRef, Module } from '@nestjs/common';
import { PassportService } from './passport.service';
import { PassportController } from './passport.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportAuth } from '@libs/core/databases/entities/passport.auth.entity';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenGuard } from './strategies/refresh.jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([PassportAuth]),
    forwardRef(() => UsersModule),
    JwtModule,
  ],
  controllers: [PassportController],
  providers: [PassportService, JwtStrategy],
  exports: [PassportService],
})
export class PassportModule {}
