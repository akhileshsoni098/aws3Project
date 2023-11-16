const { multiplefile, deleteFile, getListOfUploadedFile } = require("../middi/awsS3Functions");
const BlogModel = require("../models/blog");

///////////// create blog ///////////

exports.createBlog = async (req, res) => {
    const data = req.body;
    const { title, descreption } = data;

    if (!title || !descreption) {
        return res.status(400).json({ status: false, message: "Please provide required fields" });
    }

    try {
        if (req.files && req.files.blogImg) {
            const files = req.files.blogImg;
            const uploadedFiles = await multiplefile(files);
            // console.log(uploadedFiles)
            let uploadBlogImg = []
            for (let i = 0; i < uploadedFiles.length; i++) {
                uploadBlogImg.push({
                    filename: uploadedFiles[i].originalname,
                    url: uploadedFiles[i].location
                })
            }

            data.blogImg = uploadBlogImg
        }

        const saveBlog = await BlogModel.create(data)
        
res.status(201).json({status:false , message:"blog created successfully and files uploaded on aws", data:saveBlog})

    } catch (error) {
        console.error("Error creating blog", error);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};

//////////// get all blogs //////

exports.getAllBlog = async (req,res)=>{
    try{

const getAllBlog = await BlogModel.find()

res.status(200).json({status:false , message:"all blogs", data:getAllBlog})

    }catch(err){
        res.status(500).json({status:false, message:err.message})
    }
}



////////// update blog //////////////

exports.updateBlog = async (req,res)=>{
    try{

const data = req.body

const blogId = req.params.blogId


const deletePreviousAws = await BlogModel.findById(blogId)

if (req.files && req.files.blogImg) {
    const files = req.files.blogImg;
    const uploadedFiles = await multiplefile(files);
    // console.log(uploadedFiles)
    let uploadBlogImg = []
    for (let i = 0; i < uploadedFiles.length; i++) {
        uploadBlogImg.push({
            filename: uploadedFiles[i].originalname,
            url: uploadedFiles[i].location
        })
    }

    data.blogImg = uploadBlogImg

if(deletePreviousAws){

for(let i= 0; i<deletePreviousAws.blogImg.length>0; i++){
    let delFileName =  deletePreviousAws.blogImg[i].filename
console.log(delFileName)
 const deleteAws =  await deleteFile(delFileName)
console.log(deleteAws)
}
}
}

 const updateBlog = await BlogModel.findByIdAndUpdate(blogId,{...data},{new:true})

res.status(200).json({status:false , message:"blog updated successFully", data:updateBlog})

    }catch(err){
        res.status(500).json({status:false, message:err.message})
    }
}



exports.deleteBlog = async (req, res)=>{
    try{

        const blogId = req.params.blogId


        const deleteBlog = await BlogModel.findByIdAndDelete(blogId)

if(!deleteBlog){
    return res.status(404).json({status:false , message:"blog not found"})
}

console.log(deleteBlog)


    for(let i= 0; i<deleteBlog.blogImg.length>0; i++){
        let delFileName =  deleteBlog.blogImg[i].filename
    console.log(delFileName)
     const deleteAws =  await deleteFile(delFileName)
    console.log(deleteAws)
    }
    
    res.status(200).json({status:true , message:"deleted successfully"})


    }catch(err){
        return res.status(500).json({status:false , message:err.message})
    }

}



exports.getBucketList = async (req, res)=>{
    try{
    const bucketObject = await getListOfUploadedFile()

res.status(200).json({status:true, message:"list of bucket object", data:bucketObject})

}catch(err){
    return res.status(500).json({status:false , message:err.message})
}
}