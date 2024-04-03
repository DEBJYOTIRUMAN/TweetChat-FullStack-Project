import { useContext, useEffect } from "react";
import { TweetChatContext } from "../context/TweetChatContext";
import { useRouter } from "next/router";

export default function Initial() {
  const { token } = useContext(TweetChatContext);
  const router = useRouter();

  useEffect(() => {
    const handleNavigation = async () => {
      if (!token?.access_token) {
        await router.push("/login");
      } else {
        await router.push("/home");
      }
    };

    if (typeof window !== "undefined") {
      handleNavigation();
    }
  }, [token, router]);

  return null;
}
