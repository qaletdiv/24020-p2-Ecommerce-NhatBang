const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

exports.resizeImage = async (req, res, next) => {
    if (!req.file) {
        return next()
    }
    const tempFilePath = req.file.path;
    try {
        const originalname = path.parse(req.file.originalname).name;
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = ".jpeg";
        const finalFileName = `image-${originalname}-${uniqueSuffix}${ext}` ;
        req.file.processedFileName = finalFileName ;

        const finalDirectory = path.join(__dirname,"..","public" ,"uploads" ) ;
        const finalFilePath = path.join(finalDirectory , finalFileName) ;

        await sharp(tempFilePath)
        .resize(1000)
        .toFormat("jpeg")
        .jpeg({quality : 80})
        .toFile(finalFilePath)
    // xoa fodder temp 
    fs.unlink(tempFilePath ,(err) => {
        if(err) {
            console.error("loi khi xoa file :", tempFilePath, err);
        }
        else {
            console.log("da xoa file temp :", tempFilePath)
        }
    })
    next()
    } catch (error) {
        console.error("loi khi xu ly anh" , error) ;
        fs.unlink(tempFilePath, (err) => {
            if (err) {
                console.error("loi khi xoa file :", tempFilePath, err);
            }
            else {
                console.log("da xoa file temp :", tempFilePath)
            }
        }) ;
        next(error) ;
    }
}