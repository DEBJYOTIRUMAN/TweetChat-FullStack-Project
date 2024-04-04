import { useContext, useEffect } from "react";
import { TweetChatContext } from "../context/TweetChatContext";
import { useRouter } from "next/router";

export default function Initial() {
  const { token } = useContext(TweetChatContext);
  const router = useRouter();

  useEffect(() => {
    const app = () => {
      if (!token || !token.access_token) {
        router.push("/login");
      } else {
        router.push("/home");
      }
    };

    if (typeof window !== "undefined") {
      app();
    }
  }, [token, router]);

  return null;
}
