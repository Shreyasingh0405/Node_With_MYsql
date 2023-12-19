const booksModel = require("../models/books")
const { uploadToAws } = require("../helpers/aws");
const CONFIG = require("../config/config");
const user=require("../models/user");
const booksCreated = async (req, res) => {
    try {
        const { bookName, authorName, description, title, userId } = req.body
        let coverPage = req.files;
        coverPage = await uploadToAws("MYSQL", "Books", coverPage)
        const bookData = await booksModel.create({
            bookName: bookName,
            description: description,
            title: title,
            userId: userId,
            authorName: authorName,
            coverPage: coverPage
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
            attributes: { eexclude: ['userId', 'id'] },
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
            attributes: { exclude: ['userId', 'id'] },
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
// Controller function to get user details with books
// const getUserWithBooks = async (req, res) => {
//     try {
//       const userId = req.body;
//       booksModel.hasMany(user, { foreignKey: 'userId' });
//       user.belongsTo(booksModel, { foreignKey: 'userId' });
//       const userWithBooks = await booksModel.findOne(userId, {
//         include: user
//       });
  
//       if (!userWithBooks) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       // Send the user details with books in the response
//       res.json(userWithBooks);
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   };
  


module.exports = {
    booksCreated,
    getBooksData,
    getBooksDataById,
    updateBooksDataById,
    deleteBooksDataById,
    updateBooksDataByUserId,
    getBooksDataByUserId,
    //getUserWithBooks
}