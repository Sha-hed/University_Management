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
exports.AuthServices = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    // is userExists with this id
    // const isUserExists = await User.findOne({ id: payload.id });
    const isUserExists = yield user_model_1.User.isUserExistsByCustomId(payload.id);
    const isDeleted = yield user_model_1.User.isUserDeleted(payload.id);
    if (!isUserExists) {
        throw new AppError_1.default(400, 'User Is Not Exists');
    }
    // const isDeleted = isUserExists?.isDeleted;
    if (isDeleted) {
        throw new AppError_1.default(400, 'User is Deleted!');
    }
    const isBlocked = isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.status;
    if (isBlocked === 'blocked') {
        throw new AppError_1.default(400, 'User is blocked!');
    }
    if (!(yield user_model_1.User.isPasswordMatched(payload.password, isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.password))) {
        throw new AppError_1.default(403, 'Password not matched');
    }
    const Payload = {
        userId: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.id,
        role: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.role,
    };
    const access_token = jsonwebtoken_1.default.sign({
        data: Payload,
    }, config_1.default.jwt_secret, { expiresIn: '10d' });
    // const isPasswordCorrect = await bcrypt.compare(payload.password, isUserExists?.password);
    // console.log(isPasswordCorrect);
    return {
        access_token,
        needsPasswordChanged: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.needsPasswordChange
    };
});
exports.AuthServices = { loginUser };
