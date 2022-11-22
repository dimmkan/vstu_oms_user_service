import { Module } from '@nestjs/common';
import { MailerModule } from 'src/mailer/mailer.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [MailerModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
