import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { StudentModule } from './student/student.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './common/guards';
import { AuthService } from './auth/auth.service';
import { User, UserSchema } from './common/schemas';
import { JwtService } from '@nestjs/jwt';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configservice: ConfigService) => ({
        uri: configservice.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
    StudentModule,
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AuthService, AppService, JwtStrategy, JwtService],
  exports: [AuthService],
})
export class AppModule {}
