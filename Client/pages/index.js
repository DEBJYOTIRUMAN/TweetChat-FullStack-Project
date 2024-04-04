import { useContext, useEffect } from "react";
import { TweetChatContext } from "../context/TweetChatContext";
import { useSafeNavigation } from "../lib/useSafeNavigation";

export default function Initial() {
  const { token } = useContext(TweetChatContext);
  const safePush = useSafeNavigation();

  useEffect(() => {
    const handleNavigation = async () => {
      if (!token || !token.access_token) {
        await safePush("/login");
      } else {
        await safePush("/home");
      }
    };

    handleNavigation();
  }, [token]);

  return null;
}
