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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentServices = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { TStudent } from './student.interface';
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = require("./student.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const student_constant_1 = require("./student.constant");
// const createStudentIntoDB = async (studentData: TStudent) => {
//   // if(await Student.isUserExists(studentData.id)){
//   //   throw new Error('User Already Exists Man, Statics Methods')
//   // }
//   const result = await Student.create(studentData); // Buildin Static Method
//   // const student = new Student(studentData); // Build in instance method
//   // if(await student.isUserExists(studentData.id)){
//   //  throw new Error("Student Already Exists");
//   // }
//   // const result = await student.save();
//   return result;
// };
const getAllStudentFrom = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // let searchTerm = '';
    // if (query?.searchTerm) {
    //   searchTerm = query?.searchTerm as string;
    // }
    // const queryObj = { ...query };
    // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    // excludeFields.forEach((el) => delete queryObj[el]);
    // console.log('Query Object ta ke dekhbo ', queryObj);
    // console.log('Query gula ', query);
    // // { email: {$regex : 'text', options: 'i'}}
    // const studentSearchAbleFields = ['email', 'name.firstName', 'presentAddress'];
    // const searchQuery = Student.find({
    //   $or: studentSearchAbleFields.map((field) => {
    //     return { [field]: { $regex: searchTerm, $options: 'i' } };
    //   }),
    // });
    // const filterQuery = searchQuery
    //   .find(queryObj)
    //   .populate('admissionSemester')
    //   .populate({
    //     path: 'admissionDepartment',
    //     populate: {
    //       path: 'academicFaculty',
    //     },
    //   });
    // let sort = '-createdAt';
    // if (query.sort) {
    //   sort = query.sort as string;
    // }
    // const sortQuery = filterQuery.sort(sort);
    // let limit = 10;
    // if (query.limit) {
    //   limit = query.limit as number;
    // }
    // let page = 1;
    // let skip = 1;
    // if(query.page){
    //   page = Number(query?.page);
    //   skip = (page-1)*limit
    // }
    // const paginateQuery = sortQuery.skip(skip)
    // const limitQuery = paginateQuery.limit(limit);
    // // field limiting
    // let fields = '-__v';
    // if(query.fields){
    //   fields = (query.fields as string).split(',').join(' ');
    //   console.log(fields);
    // }
    // const fieldFiltering =await limitQuery.select(fields)
    const studentQuery = new QueryBuilder_1.default(student_model_1.Student.find()
        .populate('admissionSemester')
        .populate({
        path: 'admissionDepartment',
        populate: {
            path: 'academicFaculty',
        },
    }), query)
        .search(student_constant_1.studentSearchAbleFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield studentQuery.modelQuery;
    return result;
});
const getSingleStudentData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const result = yield student_model_1.Student.findOne({ id });
    return result;
});
const deleteStudentFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedStudent = yield student_model_1.Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedStudent) {
            throw new AppError_1.default(400, 'Failed To Delete Student');
        }
        const deletedUser = yield user_model_1.User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        if (!deletedUser) {
            throw new AppError_1.default(400, 'Failed To Delete User');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return deletedUser;
        // eslint-disable-next-line no-unused-vars
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
    }
});
const updateStudentIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, guardian, localGuardian } = payload, remainingData = __rest(payload, ["name", "guardian", "localGuardian"]);
    const modifiedData = Object.assign({}, remainingData);
    console.log('Checking Errors ', payload);
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedData[`name.${key}`] = value;
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedData[`localGuardian.${key}`] = value;
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedData[`guardian.${key}`] = value;
        }
    }
    const result = yield student_model_1.Student.findOneAndUpdate({ id }, modifiedData, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.StudentServices = {
    // createStudentIntoDB,
    getAllStudentFrom,
    getSingleStudentData,
    deleteStudentFromDB,
    updateStudentIntoDB,
};
