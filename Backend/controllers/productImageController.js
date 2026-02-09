
const {Product_Image ,Product} = require('../models') ;
const product = require('../models/product');
const path = require('path');
const fs = require('fs');
const { where } = require('sequelize');
 exports.createProductImage = async (req , res ,next) => {
  try {
      const { productId } = req.body;
      if(!productId) {
          return res.status(400).json({ message: "Thieu productId" });
      }
      const product = await Product.findByPk(productId);
      if (!product) {
          return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }
      if (!req.file) {
          return res.status(400).json({ message: "Thiếu file ảnh" });
      }
    //   const processedImage = req.file ? req.file.processedFileName : null;

      const newProductImage = await Product_Image.create({
          productId : Number(productId),
          imageUrl: req.file.processedFileName,
      });
      res.status(201).json({
          message: `Tao anh san pham thanh cong ${productId}`,
          newProductImage
      })
  } catch (error) {
    next(error)
  }
}

exports.updateProductImage = async(req, res , next ) => {
   
    try {
        const { id } = req.params;
        const { productId } = req.body;

        const oldImage = await Product_Image.findByPk(id);
        if (!oldImage) {
            return res.status(404).json({ message: "Khong tim thay anh san pham " });
        }
        if (productId) {
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ message: "Khong tim thay san pham" });
            }
        }

        let newFileName = oldImage.imageUrl;
        if (req.file) {
            newFileName = req.file.processedFileName;

            if (oldImage.imageUrl) {
                const oldPath = path.join(
                    __dirname, "..", "public", "uploads", oldImage.imageUrl
                )
                fs.unlink(oldPath, (err) => {
                    if (err) console.log("Khong xoa duoc anh cu:", err.message);
                })
            };

        }
        await Product_Image.update(
            {
                productId: productId ? Number(productId) : oldImage.productId,
                imageUrl: newFileName,
            },
            {
                where: {
                    id: Number(id) 
                }
            }
        )
        const updated = await Product_Image.findByPk(id);
        res.json({
            message: "Cap nhat anh san pham thanh cong",
            data: updated,
        });
    } catch (error) {
     next(error)   
    }
}



