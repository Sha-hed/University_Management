"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFaculty = exports.academicFacultySchema = void 0;
const mongoose_1 = require("mongoose");
exports.academicFacultySchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
}, { timestamps: true });
exports.AcademicFaculty = (0, mongoose_1.model)('AcademicFaculty', exports.academicFacultySchema);
