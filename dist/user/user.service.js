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
exports.UserService = void 0;
const sdk_1 = require("@directus/sdk");
const common_1 = require("@nestjs/common");
let UserService = class UserService {
    constructor() {
        this.directus = new sdk_1.Directus(process.env.DIRECTUS_HOST, {
            auth: {
                staticToken: process.env.ADMIN_API_KEY,
            },
        });
    }
    async getUserInfo(id) {
        const users_collection = this.directus.items('users');
        return users_collection.readOne(id, {
            fields: [
                'id',
                'email',
                'confirmed',
                'user_profiles.id',
                'user_profiles.full_name',
                'user_profiles.sex',
                'user_profiles.birthday',
                'user_profiles.user_building.id',
                'user_profiles.user_building.name',
                'user_profiles.user_building.address',
            ],
        });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map