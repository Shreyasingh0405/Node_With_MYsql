const AWS = require("aws-sdk");
const config = require("../config/config");

// AWS.config.update({ region: config.REGION });

const s3 = new AWS.S3({
	credentials: {
		accessKeyId: config.ACCESS_KEY,
		secretAccessKey: config.SECRET_KEY,
	},
});

const uploadToAws = async (mainFolder, folder, files) => {
	// Check if the main folder exists
	const mainFolderExists = await checkIfFolderExists(
		config.BUCKET_NAME,
		mainFolder
	);

	// If the main folder doesn't exist, create it
	if (!mainFolderExists) {
		await createFolder(config.BUCKET_NAME, mainFolder);
	}

	const filesArray = Array.isArray(files) ? files : [files];
	const uploadPromises = filesArray.map((file) => {
		const params = {
			Bucket: config.BUCKET_NAME,
			Key: `${mainFolder}/${folder}/${file.originalname}`, // Include the main folder in the Key
			Body: file.buffer,
			ContentType: "image/jpg/pdf/jpeg/png",
		};

		return new Promise((resolve, reject) => {
			s3.upload(params, (error, data) => {
				if (error) {
					console.error(error);
					// eslint-disable-next-line prefer-promise-reject-errors
					reject(false);
				} else {
					resolve({
						href: `${mainFolder}/${folder}/${file.originalname}`,
						name: file.originalname,
						size: file.size,
					});
				}
			});
		});
	});

	try {
		const locations = await Promise.all(uploadPromises);
		return locations.filter(Boolean);
	} catch (error) {
		console.error("Error uploading files:", error);
		// Handle the error as needed
		throw new Error(error.message);
	}
};

// Function to check if a folder exists
const checkIfFolderExists = async (bucketName, folderName) => {
	try {
		await s3.headObject({ Bucket: bucketName, Key: folderName }).promise();
		return true; // Folder exists
	} catch (error) {
		if (error.code === "NotFound") {
			return false; // Folder does not exist
		} else {
			throw error; // Other error occurred
		}
	}
};

// Function to create a folder
const createFolder = async (bucketName, folderName) => {
	const params = {
		Bucket: bucketName,
		Key: folderName + "/", // Add trailing slash to indicate it's a folder
		Body: "", // Empty body for creating a folder
	};

	try {
		await s3.upload(params).promise();
	} catch (error) {
		console.error("Error creating folder:", error);
		// Handle the error as needed
		throw new Error(error.message);
	}
};

async function getSignedUrl(fileName) {
	try {
		return await s3.getSignedUrlPromise("getObject", {
			Bucket: config.BUCKET_NAME,
			Key: fileName,
			Expires: 60 * 60, // Set the expiration time to 1 hour (in seconds)
		});
	} catch (error) {
		throw new Error(error.message);
	}
}

const deleteFile = async (fileLocation) => {
	try {
		await s3
			.deleteObject({
				Bucket: config.BUCKET_NAME,
				Key: fileLocation,
			})
			.promise();
		console.log("File deleted successfully");
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = { uploadToAws, deleteFile, createFolder, getSignedUrl };
