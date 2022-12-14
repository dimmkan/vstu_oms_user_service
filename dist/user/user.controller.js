"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_rmq_1 = require("nestjs-rmq");
const contracts_1 = require("../contracts");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUserInfo({ id }) {
        return this.userService.getUserInfo(id);
    }
    async updateUserInfo(dto) {
        return this.userService.updateUserInfo(dto);
    }
    async getUserAvatar({ id }) {
        return this.userService.getUserAvatar(id);
    }
    async setUserAvatar(dto) {
        return this.userService.setUserAvatar(dto);
    }
    async deleteUserAvatar({ id }) {
        return this.userService.deleteUserAvatar(id);
    }
    async validateUserEmail({ email }) {
        return this.userService.validateUserEmail(email);
    }
    async generateRefreshPasswordLink({ email, new_password }) {
        return this.userService.generateRefreshPasswordLink(email, new_password);
    }
    async confirmRefreshPasswordLink({ hash }) {
        return this.userService.confirmRefreshPasswordLink(hash);
    }
};
__decorate([
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.UserGetInfo.topic),
    (0, nestjs_rmq_1.RMQValidate)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contracts_1.UserGetInfo.Request]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserInfo", null);
__decorate([
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.UserUpdateInfo.topic),
    (0, nestjs_rmq_1.RMQValidate)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contracts_1.UserUpdateInfo.Request]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserInfo", null);
__decorate([
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.UserGetAvatar.topic),
    (0, nestjs_rmq_1.RMQValidate)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contracts_1.UserGetAvatar.Request]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserAvatar", null);
__decorate([
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.UserSetAvatar.topic),
    (0, nestjs_rmq_1.RMQValidate)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contracts_1.UserSetAvatar.Request]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setUserAvatar", null);
__decorate([
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.UserDeleteAvatar.topic),
    (0, nestjs_rmq_1.RMQValidate)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contracts_1.UserDeleteAvatar.Request]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUserAvatar", null);
__decorate([
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.ValidateUserEmail.topic),
    (0, nestjs_rmq_1.RMQValidate)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contracts_1.ValidateUserEmail.Request]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "validateUserEmail", null);
__decorate([
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.GenerateRefreshPasswordLink.topic),
    (0, nestjs_rmq_1.RMQValidate)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contracts_1.GenerateRefreshPasswordLink.Request]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "generateRefreshPasswordLink", null);
__decorate([
    (0, nestjs_rmq_1.RMQRoute)(contracts_1.ConfirmRefreshPasswordLink.topic),
    (0, nestjs_rmq_1.RMQValidate)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contracts_1.ConfirmRefreshPasswordLink.Request]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "confirmRefreshPasswordLink", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map