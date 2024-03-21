import Joi from "joi";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { User, Link } from "../models/index";
import bcrypt from "bcrypt";
import JwtService from "../services/JwtService";
import JwtLinkService from "../services/JwtLinkService";
import multer from "multer";
import path from "path";
import mail from "../services/SendEmail";
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});
const handleProfileImageData = multer({
  storage,
  limits: { fileSize: 1000000 * 100 },
}).single("profileImage"); // 100MB

const handleCoverImageData = multer({
  storage,
  limits: { fileSize: 1000000 * 100 },
}).single("coverImage"); // 100MB

const authController = {
  async register(req, res, next) {
    const registerSchema = Joi.object({
      firstName: Joi.string()
        .pattern(new RegExp("^[a-zA-Z ]{2,20}$"))
        .required(),
      lastName: Joi.string()
        .pattern(new RegExp("^[a-zA-Z ]{2,20}$"))
        .required(),
      phone: Joi.string().pattern(new RegExp("^[0-9]{10,15}$")).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{6,20}$"))
        .required(),
      confirmPassword: Joi.ref("password"),
    });
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    try {
      const exist = await User.exists({ email: req.body.email });
      if (exist) {
        return next(
          CustomErrorHandler.alreadyExist("This email is already taken.")
        );
      }
    } catch (err) {
      return next(err);
    }

    const { firstName, lastName, phone, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: `${firstName} ${lastName}`,
      phone,
      email,
      password: hashedPassword,
      profileImage: "uploads/profile.png",
      coverImage: "uploads/cover.jpg",
      followers: [],
      following: [],
    });
    let access_token;
    try {
      const result = await user.save();
      access_token = JwtService.sign({ _id: result._id, role: result.role });
      res.json({ access_token });
    } catch (err) {
      return next(err);
    }
  },

  async login(req, res, next) {
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{6,20}$"))
        .required(),
    });
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(CustomErrorHandler.wrongCredentials());
      }
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return next(CustomErrorHandler.wrongCredentials());
      }
      const access_token = JwtService.sign({ _id: user._id, role: user.role });
      res.json({ access_token });
    } catch (err) {
      return next(err);
    }
  },

  async me(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.user._id }).select(
        "-updatedAt -password -__v"
      );
      if (!user) {
        return next(CustomErrorHandler.notFound());
      }
      res.json(user);
    } catch (err) {
      return next(err);
    }
  },

  async allUsers(req, res, next) {
    let documents;
    try {
      documents = await User.find().select("-updatedAt -password -__v");
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    return res.json(documents);
  },

  async updateUserName(req, res, next) {
    const validateSchema = Joi.object({
      name: Joi.string().required(),
    });

    const { error } = validateSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { name } = req.body;
    let document;
    try {
      document = await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          name: name,
        },
        { new: true }
      ).select("-updatedAt -password -__v");
    } catch (err) {
      return next(err);
    }
    res.status(201).json(document);
  },

  async updateProfilePic(req, res, next) {
    handleProfileImageData(req, res, async (err) => {
      if (err) {
        return next(CustomErrorHandler.serverError(err.message));
      }

      const filePath = req.file.path;
      let document;
      try {
        document = await User.findOneAndUpdate(
          { _id: req.params.id },
          {
            profileImage: filePath,
          },
          { new: true }
        ).select("-updatedAt -password -__v");
      } catch (err) {
        return next(err);
      }
      res.status(201).json(document);
    });
  },

  async updateCoverPic(req, res, next) {
    handleCoverImageData(req, res, async (err) => {
      if (err) {
        return next(CustomErrorHandler.serverError(err.message));
      }
      const filePath = req.file.path;
      let document;
      try {
        document = await User.findOneAndUpdate(
          { _id: req.params.id },
          {
            coverImage: filePath,
          },
          { new: true }
        ).select("-updatedAt -password -__v");
      } catch (err) {
        return next(err);
      }
      res.status(201).json(document);
    });
  },

  async handleFollow(req, res, next) {
    const validateSchema = Joi.object({
      id: Joi.string().required(),
      followers: Joi.array().required(),
      following: Joi.array().required(),
    });

    const { error } = validateSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { id, followers, following } = req.body;
    //Update Followers
    let document;
    try {
      document = await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          followers: followers,
        },
        { new: true }
      ).select("-updatedAt -password -__v");
    } catch (err) {
      return next(err);
    }
    //Update Following
    let document2;
    try {
      document2 = await User.findOneAndUpdate(
        { _id: id },
        {
          following: following,
        },
        { new: true }
      ).select("-updatedAt -password -__v");
    } catch (err) {
      return next(err);
    }
    res.status(201).json([document, document2]);
  },

  async getFollowersProfile(req, res, next) {
    const validateSchema = Joi.object({
      followers: Joi.array().required(),
    });

    const { error } = validateSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { followers } = req.body;
    let documents;
    try {
      documents = await User.find({
        _id: { $in: followers },
      }).select("-updatedAt -password -__v");
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    return res.json(documents);
  },

  async getFollowingProfile(req, res, next) {
    const validateSchema = Joi.object({
      following: Joi.array().required(),
    });

    const { error } = validateSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { following } = req.body;
    let documents;
    try {
      documents = await User.find({
        _id: { $in: following },
      }).select("-updatedAt -password -__v");
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
    return res.json(documents);
  },

  async forgotPasswordLogin(req, res, next) {
    const forgotPasswordLoginSchema = Joi.object({
      email: Joi.string().email().required(),
    });
    const { error } = forgotPasswordLoginSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(CustomErrorHandler.wrongCredentials());
      }
      const link_token = JwtLinkService.sign({ email: user.email });
      mail(link_token, user.email);
      res.json({ link_token });
    } catch (err) {
      return next(err);
    }
  },

  async checkValidLink(req, res, next) {
    let link;
    try {
      link = await Link.findOne({ link_token: req.params.id });
      // Check the link is exist or not
      if (!link) {
        return next(CustomErrorHandler.invalidLink());
      }
      // Check the link is invalid or not
      if (link.invalid) {
        return next(CustomErrorHandler.invalidLink());
      }

      try {
        const { email } = JwtLinkService.verify(req.params.id);
        try {
          await Link.findOneAndUpdate(
            { link_token: req.params.id },
            {
              invalid: true,
            },
            { new: true }
          );
          return res.json({ email });
        } catch (err) {
          return next(err);
        }
      } catch (err) {
        return next(CustomErrorHandler.invalidLink());
      }
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
  },

  async updatePassword(req, res, next) {
    const updatePasswordSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{6,20}$"))
        .required(),
      confirmPassword: Joi.ref("password"),
    });
    const { error } = updatePasswordSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await User.findOneAndUpdate(
        { email: email },
        {
          password: hashedPassword,
        },
        { new: true }
      );
      if (!user) {
        return next(CustomErrorHandler.wrongCredentials());
      }
      const access_token = JwtService.sign({ _id: user._id, role: user.role });
      res.json({ access_token });
    } catch (err) {
      return next(err);
    }
  },
};
export default authController;
