"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateError = void 0;
const express_validator_1 = require("express-validator");
const validateError = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ message: errors.array()[0].msg });
};
exports.validateError = validateError;
//# sourceMappingURL=validatorError.js.map