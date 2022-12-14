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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSetAvatar = void 0;
const class_validator_1 = require("class-validator");
var UserSetAvatar;
(function (UserSetAvatar) {
    UserSetAvatar.topic = 'user.setavatar.query';
    class Request {
    }
    __decorate([
        (0, class_validator_1.IsNumber)(),
        __metadata("design:type", Number)
    ], Request.prototype, "id", void 0);
    __decorate([
        (0, class_validator_1.IsBase64)(),
        __metadata("design:type", String)
    ], Request.prototype, "avatar", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], Request.prototype, "filename", void 0);
    UserSetAvatar.Request = Request;
    class Response {
    }
    UserSetAvatar.Response = Response;
})(UserSetAvatar = exports.UserSetAvatar || (exports.UserSetAvatar = {}));
//# sourceMappingURL=setUserAvatar.js.map