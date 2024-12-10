"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
// import { StudentRoutes } from './app/modules/student/student.route';
// import { UserRoutes } from './app/modules/user/user.route';
const globalErrorHandlers_1 = __importDefault(require("./app/middleware/globalErrorHandlers"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Application Route
app.use('/api/v1', routes_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
//Global Error Handler 
app.use(globalErrorHandlers_1.default);
app.use(notFound_1.default);
exports.default = app;
