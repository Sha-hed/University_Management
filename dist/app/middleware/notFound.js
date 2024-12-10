"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res, 
// eslint-disable-next-line no-unused-vars
next) => {
    return res.status(404).json({
        success: false,
        message: "API Not Found !!",
        error: '',
    });
};
exports.default = notFound;
