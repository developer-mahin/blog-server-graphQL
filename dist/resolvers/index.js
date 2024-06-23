"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const Mutation_1 = require("./Mutation");
const Query_1 = require("./Query");
exports.resolvers = {
    Query: Query_1.Query,
    Mutation: Mutation_1.Mutation,
};
