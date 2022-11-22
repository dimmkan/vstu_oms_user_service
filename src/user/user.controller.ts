import { Body, Controller } from '@nestjs/common';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import {
  ConfirmRefreshPasswordLink,
  GenerateRefreshPasswordLink,
  UserDeleteAvatar,
  UserGetAvatar,
  UserGetInfo,
  UserSetAvatar,
  UserUpdateInfo,
  ValidateUserEmail,
} from 'src/contracts';
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

  @RMQRoute(UserUpdateInfo.topic)
  @RMQValidate()
  async updateUserInfo(
    @Body() dto: UserUpdateInfo.Request,
  ): Promise<UserUpdateInfo.Response> {
    return this.userService.updateUserInfo(dto);
  }

  @RMQRoute(UserGetAvatar.topic)
  @RMQValidate()
  async getUserAvatar(
    @Body() { id }: UserGetAvatar.Request,
  ): Promise<UserGetAvatar.Response> {
    return this.userService.getUserAvatar(id);
  }

  @RMQRoute(UserSetAvatar.topic)
  @RMQValidate()
  async setUserAvatar(
    @Body() dto: UserSetAvatar.Request,
  ): Promise<UserSetAvatar.Response> {
    return this.userService.setUserAvatar(dto);
  }

  @RMQRoute(UserDeleteAvatar.topic)
  @RMQValidate()
  async deleteUserAvatar(
    @Body() { id }: UserDeleteAvatar.Request,
  ): Promise<UserDeleteAvatar.Response> {
    return this.userService.deleteUserAvatar(id);
  }

  @RMQRoute(ValidateUserEmail.topic)
  @RMQValidate()
  async validateUserEmail(
    @Body() { email }: ValidateUserEmail.Request,
  ): Promise<ValidateUserEmail.Response> {
    return this.userService.validateUserEmail(email);
  }

  @RMQRoute(GenerateRefreshPasswordLink.topic)
  @RMQValidate()
  async generateRefreshPasswordLink(
    @Body() { email, new_password }: GenerateRefreshPasswordLink.Request,
  ): Promise<GenerateRefreshPasswordLink.Response> {
    return this.userService.generateRefreshPasswordLink(email, new_password);
  }

  @RMQRoute(ConfirmRefreshPasswordLink.topic)
  @RMQValidate()
  async confirmRefreshPasswordLink(
    @Body() { hash }: ConfirmRefreshPasswordLink.Request,
  ): Promise<ConfirmRefreshPasswordLink.Response> {
    return this.userService.confirmRefreshPasswordLink(hash);
  }
}
