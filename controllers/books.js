const booksModel = require("../models/books")
const { uploadToAws } = require("../helpers/aws");
const CONFIG = require("../config/config");
const booksCreated = async (req, res) => {
    try {
        const { bookName, authorName, description, title, userId } = req.body
        let coverPagePath = req.files;
        const coverPagePaths = coverPagePath.map(files => files.path);
        const coverPageString = JSON.stringify(coverPagePaths);
        const bookData = await booksModel.create({
            bookName: bookName,
            description: description,
            title: title,
            userId: userId,
            authorName: authorName,
            coverPage: coverPageString
        }
        )
        if (bookData) {
            return res.send({ status: 1, msg: "books data created successfully" })
        } else {
            return res.send({ status: 0, msg: "books not created" })
        }
    } catch (error) {
        return res.send(error)
    }
}

const getBooksData = async (req, res) => {
    try {
        const getData = await booksModel.findAll()
        if (getData) {
            return res.send({ status: 1, msg: "data get successfully", data: getData })
        } else {
            return res.send("data not found")
        }
    } catch (error) {
        console.log(error)
    }
}

const getBooksDataById = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.send({ status: 0, msg: "bookId is required" })
        }
        const getData = await booksModel.findOne({
            where: {
                id: id
            },
            attributes: { eexclude: ['userId','id'] },
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
const getBooksDataByUserId = async (req, res) => {
    try {
        const { userId } = req.body
        if (!userId) {
            return res.send({ status: 0, msg: "bookId is required" })
        }
        const getData = await booksModel.findOne({
            where: {
                userId: userId
            },
            attributes: { exclude: ['userId','id'] },
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

const updateBooksDataById = async (req, res) => {
    try {
        const { id, bookName, authorName, description, title, } = req.body
        if (!id) {
            return res.send({ status: 0, msg: "bookId is required" })
        }
        const updateData = await booksModel.update({
            bookName: bookName,
            description: description,
            title: title,
            authorName: authorName,
        }, {
            where: {
                id: id
            }
        })
        if (updateData) {
            return res.send({ status: 1, msg: "data update successfully" })
        } else {
            return res.send({ msg: "data not found" })
        }
    } catch (error) {
        return res.send(error)
    }
}
const updateBooksDataByUserId = async (req, res) => {
    try {
        const { userId, bookName, authorName, description, title, } = req.body
        if (!userId) {
            return res.send({ status: 0, msg: "bookId is required" })
        }
        const updateData = await booksModel.update({
            bookName: bookName,
            description: description,
            title: title,
            authorName: authorName,
        }, {
            where: {
                userId: userId
            }
        })
        if (updateData) {
            return res.send({ status: 1, msg: "data update successfully" })
        } else {
            return res.send({ msg: "data not found" })
        }
    } catch (error) {
        return res.send(error)
    }
}

const deleteBooksDataById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.send({ status: 0, msg: "bookId is required" });
        }
        const deleteData = await booksModel.destroy({
            where: {
                id: id
            }
        });

        if (deleteData) {
            return res.send({ status: 1, msg: "data deleted successfully" });
        } else {
            return res.send({ msg: "data not found" });
        }
    } catch (error) {
        return res.send(error);
    }
};



module.exports = {
    booksCreated,
    getBooksData,
    getBooksDataById,
    updateBooksDataById,
    deleteBooksDataById,
    updateBooksDataByUserId,
    getBooksDataByUserId
}