import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {PassengersModule} from "../passengers/passengers.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
      forwardRef(() => PassengersModule),
      JwtModule.register({
        secret:process.env.SECRET || 'SECRET',
          signOptions: {
            expiresIn:'24h'
          }
      })
  ],
    exports: [AuthService,
        JwtModule
    ]
})
export class AuthModule {}
