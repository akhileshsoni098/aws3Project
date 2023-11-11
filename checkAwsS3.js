/* 

    require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const { S3Client, ListObjectsV2Command, GetObjectCommand, DeleteObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");

const app = express();
app.use(fileUpload());

const s3 = new S3Client({
    region: "ap-south-1",
    credentials: {
        secretAccessKey: "zI92ZheKHRIZUo3Ybpbvid1Xk+k1X+TyeaLiD3TJ",
        accessKeyId: "AKIA2RH7MPFTSZBCOEUJ",
    },
});

const BUCKET = "todo098";

// Middleware to handle errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.post("/upload", async (req, res) => {
    try {
        const file = req.files.file;

        // Use file.name instead of file.originalname
        const fileName = file.name;

        const params = {
            Bucket: BUCKET,
            Key: fileName,
            Body: file.data,
        };

        await s3.send(new PutObjectCommand(params));

        res.send(`Successfully uploaded ${fileName} to ${BUCKET}!`);
    } catch (error) {
        console.error("Error uploading file", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/multiple/upload", async (req, res) => {
    try {
        const files = req.files && req.files.files;

        if (!files || !Array.isArray(files)) {
            return res.status(400).json({
                status: "error",
                message: "No files uploaded or invalid files format",
            });
        }

        const uploadedFiles = [];

        for (const file of files) {
            const fileName = file.name;

            const params = {
                Bucket: BUCKET,
                Key: fileName,
                Body: file.data,
            };

            await s3.send(new PutObjectCommand(params));

            uploadedFiles.push({
                originalname: fileName,
                location: `https://${BUCKET}.s3.amazonaws.com/${fileName}`,
            });
        }

        console.log(uploadedFiles);

        res.json({
            status: "success",
            message: "Files uploaded successfully",
            files: uploadedFiles,
        });
    } catch (error) {
        console.error("Error uploading files", error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
});
app.get("/list", async (req, res) => {
    try {
        const r = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET }));
        const x = r.Contents.map((item) => item.Key);
        res.send(x);
    } catch (err) {
        console.error("Error listing objects", err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/download/:filename", async (req, res) => {
    const filename = req.params.filename;
    try {
        const data = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: filename }));
        res.setHeader("Content-Type", data.ContentType);
        res.send(data.Body);
    } catch (err) {
        console.error("Error downloading object", err);
        res.status(500).send("Internal Server Error");
    }
});

app.delete("/delete/:filename", async (req, res) => {
    const filename = req.params.filename;
    try {
        await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: filename }));
        res.send("File deleted successfully");
    } catch (err) {
        console.error("Error deleting object", err);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3001, () => {
    console.log("Express server is running on port 3001");
});
 */