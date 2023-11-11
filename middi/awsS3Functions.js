require("dotenv/config")

const { S3Client, ListObjectsV2Command, GetObjectCommand, DeleteObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");


const s3 = new S3Client({
    region: process.env.REGION,
    credentials: {
        secretAccessKey: process.env.ACCESS_SECRET,
        accessKeyId: process.env.ACCESS_KEY,
    },
});

const BUCKET = process.env.BUCKET;

exports.multiplefile = async (files) => {
    const uploadedFiles = [];

    try {
        if (files && Array.isArray(files)) {
            
        for (const file of files) {


            const uniquefile = `${Date.now()}${file.name}`

            const fileName = uniquefile;

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
        }else {

            const uniquefile = `${Date.now()}${files.name}`

            const fileName = uniquefile;

            const params = {

                Bucket: BUCKET,
                Key: fileName,
                Body: files.data,

            };

            await s3.send(new PutObjectCommand(params));

            uploadedFiles.push({
                originalname: fileName,
                location: `https://${BUCKET}.s3.amazonaws.com/${fileName}`,
            });

        }

        console.log(uploadedFiles);

        return uploadedFiles;
    } catch (error) {
        console.error("Error uploading files", error);
        throw error; // Rethrow the error to be caught by the calling function
    }
};

exports.singleFile = async (file) => {
    try {
        const uniquefile = `${Date.now()}${file.name}`

        const fileName = uniquefile;

        const params = {
            Bucket: BUCKET,
            Key: fileName,
            Body: file.data,
        };

        await s3.send(new PutObjectCommand(params));

        const uploadedFile = {
            originalname: fileName,
            location: `https://${BUCKET}.s3.amazonaws.com/${fileName}`,
        }

        // return `Successfully uploaded ${fileName} to ${BUCKET}!`;

        return uploadedFile

    } catch (error) {
        console.error("Error uploading file", error);
        throw error; // Rethrow the error to be caught by the calling function
    }
};

exports.getListOfUploadedFile = async () => {
    try {
        const r = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET }));
        return r.Contents.map((item) => item.Key);
    } catch (err) {
        console.error("Error listing objects", err);
        throw err; // Rethrow the error to be caught by the calling function
    }
};

exports.downloadFile = async (filename) => {
    try {
        const data = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: filename }));
        return {
            contentType: data.ContentType,
            body: data.Body,
        };
    } catch (err) {
        console.error("Error downloading object", err);
        throw err; // Rethrow the error to be caught by the calling function
    }
};

exports.deleteFile = async (filename) => {
    try {
        await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: filename }));
        return "File deleted successfully";
    } catch (err) {
        console.error("Error deleting object", err);
        throw err; // Rethrow the error to be caught by the calling function
    }
};












/* 




exports.singleFile =   async (file, res)=> {
    try {
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
}

 exports.getListOfUploadedFile = async (req, res)=> {
    try {
        const r = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET }));
        const x = r.Contents.map((item) => item.Key);
        res.send(x);
    } catch (err) {
        console.error("Error listing objects", err);
        res.status(500).send("Internal Server Error");
    }
}

    exports.downloadFile =  async (req, res)=> {
    const filename = req.params.filename;
    try {
        const data = await s3.send(new GetObjectCommand({ Bucket: BUCKET, Key: filename }));
        res.setHeader("Content-Type", data.ContentType);
        res.send(data.Body);
    } catch (err) {
        console.error("Error downloading object", err);
        res.status(500).send("Internal Server Error");
    }
}

 exports.deleteFile = async (filename, res) => {
    
    try {
        await s3.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: filename }));
        res.send("File deleted successfully");
    } catch (err) {
        console.error("Error deleting object", err);
        res.status(500).send("Internal Server Error");
    }
}

 

 */

/* 
app.post("/upload", (req, res) => uploadSingleFile(req.files.file, res));
app.post("/multiple/upload", (req, res) => uploadMultipleFiles(req.files.files, res));
app.get("/list", listObjects);
app.get("/download/:filename", downloadFile);
app.delete("/delete/:filename", deleteFile);

 */
