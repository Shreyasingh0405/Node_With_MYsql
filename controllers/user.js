const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email) {
            return res.send({ status: 0, msg: "email is required" })
        }
        if (!password) {
            return res.send({ status: 0, msg: "password is required" })
        }
        const userLogin = await userModel.findOne({ where: { email: email } });
        if (userLogin) {
            const password_valid = await bcrypt.compare(password, userLogin.password);
            if (password_valid) {
                token = jwt.sign({ "id": userLogin.id, "email": userLogin.email }, "secreat Key");
                return res.send({
                    status: 1,
                    msg: "login succesfully",
                    data: token,
                });
            } else {
                return res.send({ status: 0, msg: "Password Incorrect" });
            }

        } else {
            return res.send({ status: 0, msg: "User does not exist" });
        }

    } catch (error) {
        return res.send(error)
    }

};

const getUserData = async (req, res) => {
    try {
        const getData = await userModel.findAll({ attributes: { exclude: ['password'] }, })
        if (getData) {
            return res.send({ status: 1, msg: "data get successfully", data: getData })
        } else {
            return res.send("data not found")
        }
    } catch (error) {
        console.log(error)
    }
}

const getUserDataById = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.send({ status: 0, msg: "UserId is required" })
        }
        const getData = await userModel.findOne({
            where: {
                id: id
            },
            attributes: { exclude: ['password'] },
        })
        if (getData) {
            return res.send({ status: 1, msg: "data get successfully", data: getData })
        } else {
            return res.send({ msg: "data not found" })
        }
    } catch (error) {
        return res.send(error)
    }

}


module.exports = { userRegistration, loginUser, getUserData, getUserDataById, };


