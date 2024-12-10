"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = exports.studentSchema = exports.localGuardianSchema = exports.guardianSchema = exports.userNameSchema = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
exports.userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'Vai FirstName Lagbei Lagbe'],
        maxlength: [20, 'MaxLength Can be more than 20 character'],
        validate: {
            validator: function (value) {
                const firstName = value.charAt(0).toUpperCase() + value.slice(1);
                return firstName === value;
            },
            message: '{VALUE} is not in capitilize Format',
        },
    },
    middleName: { type: String },
    lastName: {
        type: String,
        required: true,
        validate: {
            validator: (value) => validator_1.default.isAlpha(value),
            message: 'Last Name is not valid Man!',
        },
    },
});
exports.guardianSchema = new mongoose_1.Schema({
    fatherName: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    motherName: { type: String, required: true },
    motherContactNo: { type: String, required: true },
    motherOccupation: { type: String, required: true },
});
exports.localGuardianSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    address: { type: String, required: true },
    contactName: { type: String, required: true },
});
exports.studentSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        ref: 'User',
    },
    name: { type: exports.userNameSchema, required: true },
    gender: {
        type: String,
        enum: {
            values: ['Male', 'Female', 'Other'],
            message: '{VALUE} is not a valid Gender',
        },
        required: true,
    },
    dateOfBirth: { type: String },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: '{VALUE}Is not valid, give a valid Email',
        },
    },
    contactNumber: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: true,
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: { type: exports.guardianSchema, required: true },
    localGuardian: { type: exports.localGuardianSchema, required: true },
    admissionSemester: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'AcademicSemester',
    },
    admissionDepartment: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'AcademicDepartment',
    },
    profileImg: { type: String },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});
// Virtual
// Document Middleware
// Query Middleware
exports.studentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    // console.log(this);
    next();
});
exports.studentSchema.pre('findOne', function (next) {
    this.findOne({ isDeleted: { $ne: true } });
    // console.log(this);
    next();
});
exports.studentSchema.pre('aggregate', function (next) {
    // this.findOne({isDeleted :{ $ne: true }})
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    // console.log(this.pipeline());
    next();
});
// Creating a static Custom method
// studentSchema.statics.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };
// Creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };
exports.Student = (0, mongoose_1.model)('Student', exports.studentSchema);
