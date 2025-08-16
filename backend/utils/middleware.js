const jwt = require('jsonwebtoken')
const { PrismaClient } = require('../generated/prisma/client')
const prisma = new PrismaClient()
const wrapAsync = require("../utils/wrapAsync")
const multer = require("multer");
const path = require("path");
const ExpressError = require('./ExpressError');

module.exports.isLogin = wrapAsync(async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ "error": "Please Login" })
    }
    data = jwt.verify(token, process.env.TOKEN_SECRET)
    if (!data) {
        return res.status(401).json({ "error": "Token expired" })
    }
    let user = await prisma.user.findFirst({
        where: {
            id: data.id,
            status: "ACTIVE"
        },
        omit: {
            password: true,
        }
    })
    if (!user) {
        return res.status(401).json({ "error": "Invalid Token" })
    }
    req.user = user
    next()
})




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype.startsWith("image/")) {
            cb(null, "media");
        } else {
            cb(new ExpressError(400, "Invalid File Format!!"), false);
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + file.originalname;
        cb(null, uniqueSuffix);
    },
});

module.exports.upload = multer({ storage });

