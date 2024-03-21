import { User, Message } from "../models";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "media/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});
const handleImageData = multer({
  storage,
  limits: { fileSize: 1000000 * 100 },
}).single("image"); // 100MB

const handleAudioData = multer({
  storage,
  limits: { fileSize: 1000000 * 100 },
}).single("audio"); // 100MB

const messageController = {
  async addMessage(req, res, next) {
    try {
      const { message, from, to } = req.body;
      if (message && from && to) {
        const newMessage = await Message.create({
          sender: from,
          receiver: to,
          message,
        });
        return res.status(201).send({ message: newMessage });
      }
      return res.status(400).send("From, to, and message are required.");
    } catch (err) {
      next(err);
    }
  },

  async getMessages(req, res, next) {
    try {
      const { from, to } = req.params;

      const messages = await Message.find({
        $or: [
          { sender: from, receiver: to },
          { sender: to, receiver: from },
        ],
      }).sort({ createdAt: "asc" });
      res.status(200).json({ messages });
    } catch (err) {
      next(err);
    }
  },

  async addImageMessage(req, res, next) {
    handleImageData(req, res, async (err) => {
      try {
        if (err) return res.status(400).send("Image is required");
        let fileName = req.file.path;
        const correctedPath = fileName.replace(/\\/g, "/");

        const { from, to } = req.query;

        if (!from || !to) return res.status(400).send("From, to is required");

        const newMessage = await Message.create({
          sender: from,
          receiver: to,
          message: correctedPath,
          type: "image",
        });
        return res.status(201).json({ message: newMessage });
      } catch (err) {
        next(err);
      }
    });
  },

  async addAudioMessage(req, res, next) {
    handleAudioData(req, res, async (err) => {
      try {
        if (err) return res.status(400).send("Audio is required");

        let fileName = req.file.path;
        const correctedPath = fileName.replace(/\\/g, "/");

        const { from, to } = req.query;

        if (!from || !to) return res.status(400).send("From, to is required");

        const newMessage = await Message.create({
          sender: from,
          receiver: to,
          message: correctedPath,
          type: "audio",
        });
        return res.status(201).json({ message: newMessage });
      } catch (err) {
        next(err);
      }
    });
  },

  async getInitialContacts(req, res, next) {
    try {
      const userId = req.params.from;
      const userExists = await User.exists({ _id: userId });
      if (!userExists) {
        return res.status(404).send("User not found");
      }

      const messages = await Message.find({
        $or: [{ sender: userId }, { receiver: userId }],
      }).sort("-createdAt");

      const latestMessageMap = {};

      messages.forEach((message) => {
        const otherUserId =
          message.sender.toString() === userId
            ? message.receiver.toString()
            : message.sender.toString();
        if (
          !latestMessageMap[otherUserId] ||
          latestMessageMap[otherUserId] < message.createdAt
        ) {
          latestMessageMap[otherUserId] = message.createdAt;
        }
      });

      const usersId = Object.keys(latestMessageMap);

      let users = await User.find({ _id: { $in: usersId } });

      users.sort(
        (a, b) =>
          latestMessageMap[b._id.toString()] -
          latestMessageMap[a._id.toString()]
      );

      return res.status(200).json({
        users: users,
        onlineUsers: Array.from(onlineUsers.keys()),
      });
    } catch (err) {
      next(err);
    }
  },
};
export default messageController;
