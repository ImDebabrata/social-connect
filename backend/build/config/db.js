"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.connection = mongoose_1.default.connect(process.env.MONGO_URL);