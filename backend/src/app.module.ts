import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JokesModule } from './jokes/jokes.module';

@Module({
  imports: [UsersModule, AuthModule, JokesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
