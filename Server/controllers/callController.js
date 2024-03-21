import { generateToken04 } from "../services/TokenGenerator";
import { ZEGO_APP_ID, ZEGO_SERVER_ID } from "../config";

const callController = {
  generateCallToken(req, res, next) {
    try {
      const appId = parseInt(ZEGO_APP_ID);
      const serverSecret = ZEGO_SERVER_ID;
      const userId = req.params.userId;
      const effectiveTime = 3600;
      const payload = "";
      if (appId && serverSecret && userId) {
        const token = generateToken04(
          appId,
          userId,
          serverSecret,
          effectiveTime,
          payload
        );
        return res.status(200).json({ token });
      }
      return res
        .status(400)
        .send("User id, app id and server secret is required");
    } catch (err) {
      next(err);
    }
  },
};
export default callController;
