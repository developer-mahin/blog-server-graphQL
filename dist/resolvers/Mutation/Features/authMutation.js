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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMutation = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwtHelper_1 = __importDefault(require("../../../utils/jwtHelper"));
const config_1 = __importDefault(require("../../../config"));
exports.authMutation = {
    signup: (parent, args, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, name, password } = args;
        let error;
        const userExist = yield prisma.user.findFirst({
            where: {
                email,
            },
        });
        if (userExist) {
            return {
                error: "User Already Exist With This Email Address Try Again",
            };
        }
        const hashPassword = yield bcryptjs_1.default.hash(password, 12);
        const newUser = yield prisma.user.create({
            data: {
                email,
                name,
                password: hashPassword,
            },
        });
        if (args === null || args === void 0 ? void 0 : args.bio) {
            yield prisma.profile.create({
                data: {
                    userId: newUser.id,
                    bio: args.bio,
                },
            });
        }
        const userData = {
            email,
            userId: newUser.id,
        };
        const token = yield jwtHelper_1.default.generateToken(userData, config_1.default.jwt.secret, config_1.default.jwt.expiresIn);
        return {
            token,
            error,
        };
    }),
    signin: (parent, args, { prisma }) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = args;
        const userExist = yield prisma.user.findFirst({
            where: {
                email,
            },
        });
        if (!userExist) {
            return {
                error: "User not exist, Please try again",
                token: null,
            };
        }
        const matchedPassword = yield bcryptjs_1.default.compare(password, userExist.password);
        if (!matchedPassword) {
            return {
                error: "Password not matched",
                token: null,
            };
        }
        const userData = {
            email: userExist.email,
            userId: userExist.id,
        };
        const token = yield jwtHelper_1.default.generateToken(userData, config_1.default.jwt.secret, config_1.default.jwt.expiresIn);
        return {
            error: null,
            token,
        };
    }),
};
