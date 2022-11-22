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
const _ = require("ramda");
const FormData = require("form-data");
const stream_1 = require("stream");
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
                'user_profile.id',
                'user_profile.full_name',
                'user_profile.sex',
                'user_profile.birthday',
                'user_profile.user_building.id',
                'user_profile.user_building.name',
                'user_profile.user_building.address',
            ],
        });
    }
    async updateUserInfo(dto) {
        const user_profiles_collection = this.directus.items('user_profiles');
        const { id } = await user_profiles_collection
            .readByQuery({
            filter: {
                user_id: dto.id,
            },
            fields: ['id'],
        })
            .then(_.compose(_.head, _.path(['data'])));
        await user_profiles_collection.updateOne(id, dto.user_profile);
        return { success: true };
    }
    async getUserAvatar(id) {
        var _a;
        const user_avatar_collection = this.directus.items('user_avatar');
        const result = await user_avatar_collection
            .readByQuery({
            filter: {
                user_id: id,
            },
            fields: ['avatar'],
        })
            .then(_.compose(_.head, _.path(['data'])));
        return { avatar_id: (_a = (result && result.avatar)) !== null && _a !== void 0 ? _a : '' };
    }
    async setUserAvatar(dto) {
        const user_avatar_collection = this.directus.items('user_avatar');
        const user_avatar = await user_avatar_collection
            .readByQuery({
            filter: {
                user_id: dto.id,
            },
            fields: ['id'],
        })
            .then(_.compose(_.head, _.path(['data'])));
        const form = new FormData();
        form.append('file', stream_1.Readable.from(Buffer.from(dto.avatar, 'base64')), {
            filename: dto.filename,
        });
        const fileId = await this.directus.files.createOne(form, {}, {
            requestOptions: {
                headers: Object.assign({}, form.getHeaders()),
            },
        });
        if (!!user_avatar) {
            const result = await user_avatar_collection.updateOne(user_avatar.id, {
                avatar: fileId,
            });
            return { avatar_id: result.avatar };
        }
        else {
            const result = await user_avatar_collection.createOne({
                user_id: dto.id,
                avatar: fileId,
            });
            return { avatar_id: result.avatar };
        }
    }
    async deleteUserAvatar(id) {
        const user_avatar_collection = this.directus.items('user_avatar');
        const result = await user_avatar_collection
            .readByQuery({
            filter: {
                user_id: id,
            },
            fields: ['avatar'],
        })
            .then(_.compose(_.head, _.path(['data'])));
        if (!!result && !!result.avatar) {
            await this.directus.files.deleteOne(result.avatar);
        }
        return { success: true };
    }
    async validateUserEmail(email) {
        const users_collection = this.directus.items('users');
        const result = await users_collection
            .readByQuery({
            filter: {
                email,
            },
            fields: ['id'],
        })
            .then(_.path(['data']));
        return { validate: !!result.length };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map