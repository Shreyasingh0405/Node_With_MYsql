const fs = require("fs").promises;
const jwt = require("jsonwebtoken");

// Create Dir
const createDir = async (path) => {
	await fs.mkdir(path, { recursive: true }, (err) => {
		if (err) throw err;
	});
};

// create File
const createFile = async (filePath, fileData, fileEncoding) => {
	await fs.writeFile(filePath, fileData, { encoding: fileEncoding });
};

const checkAccess = function (role) {
	return async (req, res, next) => {
		try {
			let token, verifyAccessToken;
			if (
				req.headers.authorization &&
				req.headers.authorization !== "" &&
				req.headers.authorization !== null
			) {
				token = req.headers.authorization;
				token = token.substring(7);
			}
			const privateKey = await fs.readFile("privateKey.key", "utf8");
			if (!token) {
				return res.status(401).send("Unauthorized Access");
			}
			try {
				verifyAccessToken = jwt.verify(token, privateKey, {
					algorithms: ["RS256"],
				});
			} catch (error) {
				return res.status(401).send("Unauthorized Access");
			}
			if (role.includes(verifyAccessToken.role) === false) {
				return res.status(401).send("Unauthorized Access");
			}
			next();
		} catch (error) {
			next(error);
		}
	};
};

module.exports = { createDir, createFile, checkAccess };
