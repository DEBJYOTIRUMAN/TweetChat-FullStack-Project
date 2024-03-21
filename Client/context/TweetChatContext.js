import { createContext, useState, useEffect, useRef } from "react";
import { getToken, storeToken } from "../lib/storage";
import { io } from "socket.io-client";
import axios from "axios";

export const TweetChatContext = createContext();

export const TweetChatProvider = ({ children }) => {
  const [token, setToken] = useState({});
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [news, setNews] = useState([]);
  const [contactsPage, setContactsPage] = useState(false);
  const [currentChatUser, setCurrentChatUser] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(undefined);
  const [messagesSearch, setMessagesSearch] = useState(false);
  const [userContacts, setUserContacts] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [contactSearch, setContactSearch] = useState("");
  const [voiceCall, setVoiceCall] = useState(undefined);
  const [videoCall, setVideoCall] = useState(undefined);
  const [incomingVoiceCall, setIncomingVoiceCall] = useState(undefined);
  const [incomingVideoCall, setIncomingVideoCall] = useState(undefined);
  const [socketEvent, setSocketEvent] = useState(false);
  const socketRef = useRef();

  // Fetch Token From Local Storage
  useEffect(() => {
    getToken().then((token) => {
      if (!token) {
        return;
      }
      setToken(JSON.parse(token));
    });
  }, []);

  // Store Token Local Storage
  useEffect(() => {
    if (!token.access_token) return;
    storeToken(token);
  }, [token]);

  useEffect(() => {
    if (!token.access_token) return;
    fetchUser();
    fetchAllUsers();
    fetchPosts();
    fetchNews();
  }, [token]);

  const fetchUser = () => {
    fetch("https://tweetchat-1y3f.onrender.com/api/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((user) => {
        if (!user._id) {
          alert("Something went wrong. Please try again.");
          return;
        }
        setCurrentAccount(user._id);
        setCurrentUser(user);
      });
  };

  const fetchAllUsers = async () => {
    try {
      await fetch("https://tweetchat-1y3f.onrender.com/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      })
        .then((res) => res.json())
        .then((documents) => {
          const sortedProfile = documents.sort((a, b) => {
            return b.followers.length - a.followers.length;
          });
          setAllUsers(sortedProfile);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPosts = async () => {
    try {
      await fetch("https://tweetchat-1y3f.onrender.com/api/post", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      })
        .then((res) => res.json())
        .then((allPosts) => {
          setPosts(allPosts);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNews = async () => {
    try {
      await fetch("https://tweetchat-1y3f.onrender.com/api/news", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      })
        .then((res) => res.json())
        .then((allNews) => {
          setNews(allNews);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = (
    user,
    currentUser,
    currentAccount,
    allUsers,
    setAllUsers,
    setCurrentUser
  ) => {
    let updateFollowers = user.followers;
    let updateFollowing = currentUser.following;
    if (!updateFollowers.includes(currentAccount)) {
      updateFollowers.push(currentAccount);
      updateFollowing.push(user._id);
    } else {
      updateFollowers = updateFollowers.filter(
        (item) => item !== currentAccount
      );
      updateFollowing = updateFollowing.filter((item) => item !== user._id);
    }
    fetch(`https://tweetchat-1y3f.onrender.com/api/user/follow/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify({
        id: currentAccount,
        followers: updateFollowers,
        following: updateFollowing,
      }),
    })
      .then((res) => res.json())
      .then((documents) => {
        setAllUsers(
          allUsers.map((user) =>
            user._id === documents[0]._id
              ? documents[0]
              : user && user._id === documents[1]._id
              ? documents[1]
              : user
          )
        );
        setCurrentUser(documents[1]);
      });
  };

  useEffect(() => {
    if (currentUser) {
      socketRef.current = io("https://tweetchat-1y3f.onrender.com");
      socketRef.current.emit("add-user", currentUser.id);
      setSocket(socketRef);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentChatUser || !socketRef.current) return;
    if (socketRef.current && !socketEvent) {
      socketRef.current.on("msg-receive", (data) => {
        if (data.from === currentChatUser?.id) {
          setMessages((prevMessages) => [...prevMessages, data.message]);
        }
      });

      socketRef.current.on(
        "incoming-voice-call",
        ({ from, roomId, callType }) => {
          setIncomingVoiceCall({ ...from, roomId, callType });
        }
      );

      socketRef.current.on(
        "incoming-video-call",
        ({ from, roomId, callType }) => {
          setIncomingVideoCall({ ...from, roomId, callType });
        }
      );

      socketRef.current.on("voice-call-rejected", () => {
        setVoiceCall(undefined);
        setVideoCall(undefined);
        setIncomingVoiceCall(undefined);
        setIncomingVideoCall(undefined);
      });

      socketRef.current.on("video-call-rejected", () => {
        setVoiceCall(undefined);
        setVideoCall(undefined);
        setIncomingVoiceCall(undefined);
        setIncomingVideoCall(undefined);
      });

      socketRef.current.on("online-users", ({ onlineUsers }) => {
        setOnlineUsers(onlineUsers);
      });

      setSocketEvent(true);
    }
  }, [currentChatUser, socketRef.current]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const {
          data: { messages },
        } = await axios.get(
          `https://tweetchat-1y3f.onrender.com/api/get-messages/${currentUser.id}/${currentChatUser.id}`,
          {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
            },
          }
        );
        setMessages(messages);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentChatUser?.id) {
      getMessages();
    }
  }, [currentChatUser]);

  return (
    <TweetChatContext.Provider
      value={{
        token,
        setToken,
        currentAccount,
        currentUser,
        setCurrentUser,
        allUsers,
        setAllUsers,
        posts,
        setPosts,
        news,
        setNews,
        handleFollow,
        contactsPage,
        setContactsPage,
        currentChatUser,
        setCurrentChatUser,
        messages,
        setMessages,
        socket,
        setSocket,
        messagesSearch,
        setMessagesSearch,
        userContacts,
        setUserContacts,
        onlineUsers,
        setOnlineUsers,
        filteredContacts,
        setFilteredContacts,
        contactSearch,
        setContactSearch,
        voiceCall,
        setVoiceCall,
        videoCall,
        setVideoCall,
        incomingVoiceCall,
        setIncomingVoiceCall,
        incomingVideoCall,
        setIncomingVideoCall,
      }}
    >
      {children}
    </TweetChatContext.Provider>
  );
};
