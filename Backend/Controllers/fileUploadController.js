


// const cloudinary = require("../Config/Cloudinary"); // Ensure the path is correct


// const fileUpload = async (req, res) => {
//     try {
//         // Log the file data to check if multer is working correctly
//         console.log('Uploaded file:', req.file);

//         if (!req.file) {
//             return res.status(400).json({ message: "No file uploaded" });
//         }

//         const uploadStream = cloudinary.uploader.upload_stream(
//             { resource_type: "auto" },
//             (error, result) => {
//                 if (error) {
//                     console.error('Cloudinary Error:', error); // Log Cloudinary error
//                     return res.status(500).json({ message: "Unable to upload the files", error });
//                 } else {
//                     return res.status(200).json({ message: "The files are uploaded successfully", url: result.secure_url });
//                 }
//             }
//         );

//         // Check if file stream is valid before piping it
//         if (req.file.stream) {
//             req.file.stream.pipe(uploadStream);
//         } 
//         else {
//           console.log("file upload false 2")
//             return res.status(402).json({ message: "File stream not found" });
            
//         }

//     } catch (error) {
//         console.error('Server Error:', error); // Log server-side error
//         return res.status(500).json({ message: "Server error occurred while uploading the files" });
//     }
// };


const { Readable } = require('stream');
const cloudinary = require("../Config/Cloudinary");

const fileUpload = async (req, res) => {
    console.log("Received file:", req.file); // Log the entire req.file object

    if (req.file && req.file.buffer) {
        // Convert the buffer to a readable stream
        const stream = new Readable();
        stream.push(req.file.buffer);
        stream.push(null); // Signal the end of the stream

        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
                if (error) {
                    return res.status(500).json({ message: "Unable to upload the files", error });
                } else {
                    return res.status(200).json({ message: "The files are uploaded successfully", url: result.secure_url });
                }
            }
        );

        const response = stream.pipe(uploadStream); // Pipe the readable stream to Cloudinary
        console.log(response);
    } else {
        console.log("file upload false 2");
        return res.status(402).json({ message: "File buffer not found" });
    }
};

module.exports = { fileUpload };
