import { User, News } from "../models";
import multer from "multer";
import path from "path";
import fs from "fs";
import CustomErrorHandler from "../services/CustomErrorHandler";
import Joi from "joi";
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});
const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 10 },
}).single("image"); // 10MB

const newsController = {
  async storeNews(req, res, next) {
    handleMultipartData(req, res, async (err) => {
      if (err) {
        return next(CustomErrorHandler.serverError(err.message));
      }
      const filePath = req.file.path;

      const newsValidator = Joi.object({
        caption: Joi.string().required(),
      });

      const { error } = newsValidator.validate(req.body);
      if (error) {
        fs.unlink(`${appRoot}/${filePath}`, (err) => {
          if (err) {
            return next(CustomErrorHandler.serverError(err.message));
          }
        });
        return next(error);
      }

      let user;
      try {
        user = await User.findOne({ _id: req.params.id });
        if (!user) {
          return next(CustomErrorHandler.notFound());
        }
      } catch (err) {
        return next(err);
      }

      const { caption } = req.body;
      let document;
      try {
        document = await News.create({
          userName: user.name,
          userId: user._id,
          profileImage: user.profileImage,
          caption: caption,
          imageUrl: filePath,
          likes: [],
        });
      } catch (err) {
        return next(err);
      }
      res.status(201).json(document);
    });
  },

  async allNews(req, res, next) {
    let documents;
    try {
      documents = await News.find()
        .select("-updatedAt -__v")
        .sort({ createdAt: -1 });
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    return res.json(documents);
  },

  async likeNews(req, res, next) {
    const newsSchema = Joi.object({
      likes: Joi.array().required(),
    });

    const { error } = newsSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { likes } = req.body;
    //Update Likes
    let document;
    try {
      document = await News.findOneAndUpdate(
        { _id: req.params.newsId },
        {
          likes: likes,
        },
        { new: true }
      ).select("-updatedAt -__v");
    } catch (err) {
      return next(err);
    }
    res.status(201).json(document);
  },

  async deleteNews(req, res, next) {
    const document = await News.findOneAndRemove({
      _id: req.params.newsId,
    }).select("-updatedAt -__v");
    if (!document) {
      return next(new Error("Nothing to delete"));
    }
    //Image Delete
    const imagePath = document._doc.imageUrl;
    fs.unlink(`${appRoot}/${imagePath}`, (err) => {
      if (err) {
        return next(CustomErrorHandler.serverError());
      }
    });
    res.json(document);
  },
};
export default newsController;
