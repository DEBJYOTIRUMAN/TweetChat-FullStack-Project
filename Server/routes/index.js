import express from 'express';
const router = express.Router();
import { authController, postController, newsController, messageController, callController } from '../controllers/index';
import auth from '../middlewares/auth';
import admin from '../middlewares/admin';

// Auth Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get("/me", auth, authController.me);
router.get("/user", auth, authController.allUsers);
router.put("/user/:id", auth, authController.updateUserName);
router.put("/user/image/:id", auth, authController.updateProfilePic);
router.put("/user/cover/:id", auth, authController.updateCoverPic);
router.put("/user/follow/:id", auth, authController.handleFollow);
router.post("/user/followers", auth, authController.getFollowersProfile);
router.post("/user/following", auth, authController.getFollowingProfile);
router.post("/forgot", authController.forgotPasswordLogin);
router.get("/link/:id", authController.checkValidLink);
router.put("/update", authController.updatePassword);

// Post Routes
router.post("/post/:id", auth, postController.storePost);
router.get("/post", auth, postController.allPost);
router.put("/post/like/:postId", auth, postController.likePost);
router.put("/post/comment/:postId", auth, postController.commentPost);
router.put("/post/repost/:postId", auth, postController.repost);
router.delete("/post/:postId", auth, postController.deletePost);

// News Routes
router.post("/news/:id", [auth, admin], newsController.storeNews);
router.get("/news", auth, newsController.allNews);
router.put("/news/like/:newsId", auth, newsController.likeNews);
router.delete("/news/:newsId", [auth, admin], newsController.deleteNews);

// Message Routes
router.post("/add-message", auth, messageController.addMessage);
router.get('/get-messages/:from/:to', auth, messageController.getMessages);
router.post("/add-image-message", auth, messageController.addImageMessage);
router.post("/add-audio-message", auth, messageController.addAudioMessage);
router.get("/get-initial-contacts/:from", auth, messageController.getInitialContacts);

// Call Routes
router.get("/generate-call-token/:userId", callController.generateCallToken);


export default router;
