import { JWT_LINK } from "../config";
import jwt from "jsonwebtoken";

class JwtLinkService {
  static sign(payload, expiry = "15m", secret = JWT_LINK) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }

  static verify(token, secret = JWT_LINK) {
    return jwt.verify(token, secret);
  }
}

export default JwtLinkService;
