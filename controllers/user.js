const userModel = require("../models/user");
const bcrypt = require("bcrypt")

const userRegistration = async (req, res) => {
    try {
        const userData = req.body
        const emailCheck = await userModel.findOne({ where: { email: userData.email } });
        if (emailCheck) {
            return res.send("email already exist")
        }
        userData.password = bcrypt.hashSync(
            userData.password,
            10
        );
        const registerData = await userModel.create(userData)
        if (registerData) {
            return res.send({ status: 1, msg: "data insert successfully" })
        } else {
            return res.send({ msg: "data not inserted" })
        }
    } catch (error) {
        return res.send(error)
    }

};
module.exports = { userRegistration };


