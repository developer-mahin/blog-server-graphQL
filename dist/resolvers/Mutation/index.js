"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const authMutation_1 = require("./Features/authMutation");
const postMutation_1 = require("./Features/postMutation");
exports.Mutation = Object.assign(Object.assign({}, authMutation_1.authMutation), postMutation_1.postMutation);
