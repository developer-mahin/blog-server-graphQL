"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
exports.Query = {
    allUsers: (parent, args, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma.user.findMany();
    }),
    user: (parent, args, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma.user.findUnique({
            where: {
                id: args.userId,
            },
        });
    }),
    profile: (parent, args, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma.profile.findUnique({
            where: {
                userId: args.userId,
            },
        });
    }),
    posts: (parent, args, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma.post.findMany();
    }),
};
