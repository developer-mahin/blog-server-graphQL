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
exports.postMutation = void 0;
exports.postMutation = {
    createPost: (parent, args, { prisma, userInfo }) => __awaiter(void 0, void 0, void 0, function* () {
        const { des, title } = args;
        if (!userInfo) {
            return {
                error: "User Not Found",
                post: null,
            };
        }
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
    }),
    updatePost: (parent, args, { prisma, userInfo }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!userInfo) {
            return {
                error: "Forbidden Access",
                post: null,
            };
        }
        const user = yield prisma.user.findUnique({
            where: {
                id: userInfo.userId,
            },
        });
        if (!user) {
            return {
                error: "User not found",
                post: null,
            };
        }
        const post = yield prisma.post.findUnique({
            where: {
                id: args.postId,
            },
        });
        if (!post) {
            return {
                error: "post not found",
                post: null,
            };
        }
        if (user.id !== post.userId) {
            return {
                error: "You are not the owner",
                post: null,
            };
        }
        const updatePost = yield prisma.post.update({
            where: {
                id: args.postId,
            },
            data: {
                title: args.title,
                des: args.des,
            },
        });
        return {
            error: null,
            post: updatePost,
        };
    }),
    deletePost: (parent, args, { prisma, userInfo }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!userInfo) {
            return {
                error: "Forbidden Access",
                post: null,
            };
        }
        const user = yield prisma.user.findUnique({
            where: {
                id: userInfo.userId,
            },
        });
        if (!user) {
            return {
                error: "User not found",
                post: null,
            };
        }
        const post = yield prisma.post.findUnique({
            where: {
                id: args.postId,
            },
        });
        if (!post) {
            return {
                error: "post not found",
                post: null,
            };
        }
        if (user.id !== post.userId) {
            return {
                error: "You are not the owner",
                post: null,
            };
        }
        const deletePost = yield prisma.post.delete({
            where: {
                id: args.postId,
            },
        });
        return {
            error: null,
            post: deletePost,
        };
    }),
    updatePublishStatus: (parent, args, { prisma, userInfo }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!userInfo) {
            return {
                error: "Forbidden Access",
                post: null,
            };
        }
        const user = yield prisma.user.findUnique({
            where: {
                id: userInfo.userId,
            },
        });
        if (!user) {
            return {
                error: "User not found",
                post: null,
            };
        }
        const post = yield prisma.post.findUnique({
            where: {
                id: args.postId,
            },
        });
        if (!post) {
            return {
                error: "post not found",
                post: null,
            };
        }
        if (user.id !== post.userId) {
            return {
                error: "You are not the owner",
                post: null,
            };
        }
        const updatePost = yield prisma.post.update({
            where: {
                id: args.postId,
            },
            data: {
                isPublished: args.isPublished,
            },
        });
        return {
            error: null,
            post: updatePost,
        };
    }),
};
