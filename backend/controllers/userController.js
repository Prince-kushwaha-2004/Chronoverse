const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken')
const { PrismaClient } = require('../generated/prisma/client')
const prisma = new PrismaClient()


module.exports.register = async (req, res) => {
    let { email, name, password, confirmPassword } = req.body;

    if (!req.body || !email || !name || !password || !confirmPassword) {
        return res.status(400).json({ "error": "Data is unsufficient" })
    }
    if (await prisma.user.findFirst({ where: { email: email, status: "ACTIVE" } })) {
        return res.status(400).json({ "error": "User already Exist with this email" })
    }

    if (password !== confirmPassword) {
        return res.status(401).json({ "error": "Password does not match" })
    }
    const hashPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            email: email,
            name: name,
            password: hashPassword
        }
    })
    return res.status(201).json({ message: "user created successfull" })
}

module.exports.login = async (req, res) => {
    data = req.body
    if (!data || !data.email || !data.password) {
        return res.status(400).json({ "error": "unsufficient data" })
    }

    let user = await prisma.user.findFirst({ where: { email: data.email, status: "ACTIVE" } })
    if (!user) {
        return res.status(400).json({ "error": "no user with this credentials" })
    }
    const comparePassword = await bcrypt.compare(data.password, user.password);
    if (!comparePassword) {
        return res.status(400).json({ "error": "wrong password" })
    }
    generateToken(user.id, res)
    res.status(200).json({ "message": "User login successfull" ,user_data: { "name": user.name, "email": user.email} })
}

module.exports.logout = (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: "NONE" });
    res.status(200).send({ "message": "User logout successfull" })

}
module.exports.authenticate = (req, res) => {
    res.status(200).send({ "message": "User is authenticated", user_data: { "name": req.user.name, "email": req.user.email } })

}