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
exports.User = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
exports.userSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: {
        type: String,
        enum: ['admin', 'student', 'faculty'],
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress',
    },
    isDeleted: { type: Boolean, required: true, default: false },
}, { timestamps: true });
exports.userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(this, 'We will see before saving data');
        console.log('From User Model', this);
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcryptSalt));
        next();
    });
});
exports.userSchema.post('save', function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        doc.password = '';
        console.log(this, 'after saving data');
        next();
    });
});
// Query Middleware
exports.userSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    // console.log(this);
    next();
});
exports.userSchema.pre('findOne', function (next) {
    this.findOne({ isDeleted: { $ne: true } });
    // console.log(this);
    next();
});
exports.userSchema.pre('aggregate', function (next) {
    // this.findOne({isDeleted :{ $ne: true }})
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    // console.log(this.pipeline());
    next();
});
exports.User = (0, mongoose_1.model)('user', exports.userSchema);
