import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserGetInfo } from 'src/contracts';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @RMQRoute(UserGetInfo.topic)
  @RMQValidate()
  async getUserInfo(
    @Body() { id }: UserGetInfo.Request,
  ): Promise<UserGetInfo.Response> {
    return this.userService.getUserInfo(id);
  }
}
