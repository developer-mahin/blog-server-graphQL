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
exports.Mutation = void 0;
const authMutation_1 = require("./Features/authMutation");
exports.Mutation = Object.assign(Object.assign({}, authMutation_1.authMutation), { createPost: (parent, args, { prisma, userInfo }) => __awaiter(void 0, void 0, void 0, function* () {
        const { des, title } = args;
        if (!des || !title) {
            return {
                error: "Something went wrong, Please try again",
                post: null,
            };
        }
        const postData = yield prisma.post.create({
            data: {
                des,
                title,
                isPublished: false,
                userId: userInfo.userId,
            },
        });
        return {
            error: null,
            post: postData,
        };
    }) });
