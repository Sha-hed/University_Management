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
exports.CourseServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const course_constant_1 = require("./course.constant");
const course_model_1 = require("./course.model");
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.create(payload);
    return result;
});
const getAllCoursesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.default(course_model_1.Course.find().populate('preRequisiteCourses.course'), query)
        .search(course_constant_1.CourseSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield courseQuery.modelQuery;
    return result;
});
const getSingleCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findById(id);
    return result;
});
const deleteCourseFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
const updateCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { preRequisiteCourses } = payload, basicUpdatedInfo = __rest(payload, ["preRequisiteCourses"]);
    console.log({ preRequisiteCourses }, { basicUpdatedInfo });
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const updatedBasicCourseInfo = yield course_model_1.Course.findByIdAndUpdate(id, basicUpdatedInfo, { new: true, runValidators: true });
        if (!updatedBasicCourseInfo) {
            throw new AppError_1.default(400, 'Failed to update basic info');
        }
        // Step - 02
        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            // Step -01.1
            const deletePre = preRequisiteCourses
                .filter((el) => el.isDeleted === true)
                .map((el) => el.course);
            console.log({ deletePre });
            const deleteCourses = yield course_model_1.Course.findByIdAndUpdate(id, { $pull: { preRequisiteCourses: { course: { $in: deletePre } } } }, { new: true, runValidators: true });
            if (!deleteCourses) {
                throw new AppError_1.default(400, 'Failed delete course');
            }
            // Step -01.2
            const newCourse = preRequisiteCourses.filter((e) => e.isDeleted === false);
            console.log('New Coursees', newCourse);
            const addCourses = yield course_model_1.Course.findByIdAndUpdate(id, { $addToSet: { preRequisiteCourses: { $each: newCourse } } }, { new: true, runValidators: true });
            if (!addCourses) {
                throw new AppError_1.default(400, 'Failed to add course');
            }
            console.log({ deleteCourses }, { addCourses });
        }
        const result = yield course_model_1.Course.findById(id);
        if (!result) {
            throw new AppError_1.default(400, 'Failed to find updated data');
        }
        return result;
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(400, 'Failed to updated');
    }
});
const assignFacultiesWithCourseIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.CourseFaculty.findByIdAndUpdate(id, {
        $addToSet: { faculties: { $each: payload } },
    }, {
        upsert: true, new: true
    });
    return result;
});
exports.CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    deleteCourseFromDB,
    updateCourseIntoDB,
    assignFacultiesWithCourseIntoDB,
};
