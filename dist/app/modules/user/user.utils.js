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
exports.generateFacultyId = exports.generateAdminId = exports.generateStudentId = void 0;
const user_model_1 = require("./user.model");
const findLastStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_model_1.User.findOne({
        role: 'student',
    }, {
        id: 1,
        _id: 0,
    })
        .sort({ createdAt: -1 })
        .lean();
    return (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) ? lastStudent.id : undefined;
});
const findLastAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({
        role: 'admin',
    }, {
        _id: 0,
        id: 1,
    })
        .sort({ createdAt: -1 })
        .lean();
    console.log('Result Print Kori Wait : ', result);
    return (result === null || result === void 0 ? void 0 : result.id) ? result.id : undefined;
});
const findLastFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({
        role: 'faculty',
    }, {
        _id: 0,
        id: 1,
    })
        .sort({ createdAt: -1 })
        .lean();
    return (result === null || result === void 0 ? void 0 : result.id) ? result.id : undefined;
});
const generateStudentId = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastStudentId = yield findLastStudentId();
    const lastStudentSemesterYear = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(0, 4);
    const lastStudentSemesterCode = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(4, 6);
    const currentStudentSemesterYear = payload.year;
    const currentStudentSemesterCode = payload.code;
    if (lastStudentId &&
        lastStudentSemesterCode === currentStudentSemesterCode &&
        lastStudentSemesterYear === currentStudentSemesterYear) {
        currentId = lastStudentId === null || lastStudentId === void 0 ? void 0 : lastStudentId.substring(6);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `${payload.year}${payload.code}${incrementId}`;
    return incrementId;
});
exports.generateStudentId = generateStudentId;
const generateAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastAdminId = yield findLastAdminId();
    if (lastAdminId) {
        console.log('Last Admin ID dekh hala ', lastAdminId);
        currentId = lastAdminId.substring(2);
        console.log('Ekn CUrrent ID dekho ', currentId);
    }
    // const lastStudentSemesterYear = lastStudentId?.substring(0,4);
    // const lastStudentSemesterCode = lastStudentId?.substring(4,6);
    // const currentStudentSemesterYear = payload.year;
    // const currentStudentSemesterCode = payload.code;
    // if(lastStudentId
    //   && lastStudentSemesterCode === currentStudentSemesterCode
    //   && lastStudentSemesterYear === currentStudentSemesterYear
    // ){
    //   currentId = lastStudentId?.substring(6)
    // }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `A-${incrementId}`;
    return incrementId;
});
exports.generateAdminId = generateAdminId;
const generateFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastFacultyId = yield findLastFacultyId();
    if (lastFacultyId) {
        currentId = lastFacultyId.substring(2);
    }
    // const lastStudentSemesterYear = lastStudentId?.substring(0,4);
    // const lastStudentSemesterCode = lastStudentId?.substring(4,6);
    // const currentStudentSemesterYear = payload.year;
    // const currentStudentSemesterCode = payload.code;
    // if(lastStudentId
    //   && lastStudentSemesterCode === currentStudentSemesterCode
    //   && lastStudentSemesterYear === currentStudentSemesterYear
    // ){
    //   currentId = lastStudentId?.substring(6)
    // }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementId = `F-${incrementId}`;
    return incrementId;
});
exports.generateFacultyId = generateFacultyId;
