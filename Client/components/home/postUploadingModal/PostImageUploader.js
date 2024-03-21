import { useState, useContext } from "react";
import { TweetChatContext } from "../../../context/TweetChatContext";
import InitialState from "./InitialState";
import LoadingState from "../../profile/uploadingModal/LoadingState";
import FinishedState from "../../profile/uploadingModal/FinishedState";
import axios from "axios";


const PostImageUploader = ({ posts, setPosts, setUploadModalVisible }) => {
  const { token, currentAccount } = useContext(TweetChatContext);

  const [caption, setCaption] = useState("");
  const [status, setStatus] = useState("initial");
  const [postImage, setPostImage] = useState();

  const upload = async () => {
    if (!caption || !postImage) return;
    setStatus("loading");
    
    let formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", postImage);
    try {
      const newPost = await axios.post(
        `http://localhost:5000/api/post/${currentAccount}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );
      setPosts([newPost.data, ...posts]);
      setStatus("finished");
    } catch (error) {
      console.log(error);
      setStatus("finished");
    }
  };

  const renderLogic = (modalStatus = status) => {
    switch (modalStatus) {
      case "initial":
        return (
          <InitialState
            postImage={postImage}
            setPostImage={setPostImage}
            caption={caption}
            setCaption={setCaption}
            upload={upload}
            setUploadModalVisible={setUploadModalVisible}
          />
        );

      case "loading":
        return <LoadingState />;

      case "finished":
        return <FinishedState setUploadModalVisible={setUploadModalVisible}/>;

      default:
        setUploadModalVisible(false);
        setStatus("initial");
        break;
    }
  };

  return <>{renderLogic()}</>;
};

export default PostImageUploader;
