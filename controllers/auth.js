const { singleFile } = require("../middi/awsS3Functions")
const authModel = require("../models/auth")



exports.registration = async (req, res) => {

    try {

        const data = req.body

        const { name, email, passward } = data

        if (!name || !email || !passward) {

            return res.status(400).json({ status: false, message: "Please provide required fields" })

        }

///////////////// file with all possible validation  //////////////


if (!req.files || Object.keys(req.files.profilePic).length === 0) {
    return res.status(400).json({
        status: false,
        message: "No file uploaded",
    });
}

if(!req.files || !req.files.profilePic){
    return res.status(400).json({status:false , message:"Please provide your profile pic"})
}


if (req.files && Array.isArray(req.files.profilePic)) {
  res.status(400).json({status:false ,message:"Single file upload for your profile"});
}

const file = req.files.profilePic

console.log(file)

if (!file) {
    return res.status(400).json({
        status: false,
        message: "Invalid file format",
    });
}

// Validate file size 


const fileSizeLimitInBytes = 10 * 1024 * 1024; // 10 MB
if (file.size > fileSizeLimitInBytes) {
    return res.status(400).json({
        status: false,
        message: "File size exceeds the limit",
    });
}

// Validate file type 
/* 
const allowedFileTypes = ["image/jpeg", "image/png", "application/pdf"];
if (!allowedFileTypes.includes(file.mimetype)) {
    return res.status(400).json({
        status: false,
        message: "Invalid file type",
    });
}
 */

        const uploded = await singleFile(file)

        console.log(uploded)

        data.profilePic = {
            filename: uploded.originalname,

            url: uploded.location

        }
////////////////////////////////////////////////////////////////////////

        const saveRegistration = await authModel.create(data)

        return res.status(201).json({ status: true, message: "registration success", data: saveRegistration })

    } catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
}