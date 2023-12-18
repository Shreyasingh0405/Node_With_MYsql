const { check, validationResult } = require("express-validator");

const booksValidation = [
    check("bookName").notEmpty().withMessage("bookName is required"),
    check("authorName").notEmpty().withMessage("authorName is required"),
    check("title").notEmpty().withMessage("title is required"),
    check("description").notEmpty().withMessage("description is required"),
    check("userId").notEmpty().withMessage("userId is required"),

    (req, res, next) => {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            return res.send({ status: 0, msg: errors[0].msg });
        }
        return next();
    },
];

module.exports = {booksValidation}