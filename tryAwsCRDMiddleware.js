/* 
    const { S3Client, ListObjectsV2Command, GetObjectCommand, DeleteObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
    
    const s3 = new S3Client({
        region: "ap-south-1",
        credentials: {
            secretAccessKey: "zI92ZheKHRIZUo3Ybpbvid1Xk+k1X+TyeaLiD3TJ",
            accessKeyId: "AKIA2RH7MPFTSZBCOEUJ",
        },
    });
    
    const BUCKET = "todo098";
    
    const multer = require("multer");
    const multers3 = require("multer-s3");
    
    const upload = multer({
        storage: multers3({
            s3: s3,
            bucket: BUCKET,
            key: (req, file, cb) => {
                cb(null, file.originalname);
            },
        }),
    });
    

    app.post("/upload", upload.single("file"), async (req, res) => {
        console.log(req.file);
    
        // Assuming the uploaded file name is available in req.file.originalname
        const fileName = req.file.originalname;
    
        res.send("Successfully uploaded " + req.file.location + " location! File Name: " + fileName);
    });
    

/// multiple file upload  need to work on this /// 


app.post("/multiple/upload", upload.array("files", 5), async (req, res) => {
    try {
        const uploadedFiles = req.files.map(file => ({
            originalname: file.originalname,
            location: file.location
        }));

        console.log(uploadedFiles);

        res.json({
            status: "success",
            message: "Files uploaded successfully",
            files: uploadedFiles
        });
    } catch (error) {
        console.error("Error uploading files", error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error"
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
            res.setHeader("Content-Type", data.ContentType); // Set appropriate content type
            res.send(data.Body);
        } catch (err) {
            console.error("Error downloading object", err);
            res.status(500).send("Internal Server Error");
        }
    });

     //////////////////////////////////////////////////////////////////////////////////////


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
      */