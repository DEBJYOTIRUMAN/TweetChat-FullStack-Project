import { useState } from "react";
import InitialState from "./InitialState";
import LoadingState from "./LoadingState";
import FinishedState from "./FinishedState";
import axios from "axios";

const ProfileImageUploader = ({
  token,
  currentAccount,
  setCurrentUser,
  setUploadModalVisible,
  allUsers,
  setAllUsers,
}) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("initial");
  const [profileImage, setProfileImage] = useState();

  const upload = async () => {
    if (!profileImage) return;
    setStatus("loading");

    let formData = new FormData();
    formData.append("profileImage", profileImage);
    try {
      const userDoc = await axios.put(
        `http://localhost:5000/api/user/image/${currentAccount}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );
      setCurrentUser(userDoc.data);
      setAllUsers(
        allUsers.map((user) =>
          user._id === currentAccount ? userDoc.data : user
        )
      );
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
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            name={name}
            setName={setName}
            upload={upload}
            setUploadModalVisible={setUploadModalVisible}
          />
        );

      case "loading":
        return <LoadingState />;

      case "finished":
        return <FinishedState setUploadModalVisible={setUploadModalVisible} />;

      default:
        setUploadModalVisible(false);
        setStatus("initial");
        break;
    }
  };

  return <>{renderLogic()}</>;
};

export default ProfileImageUploader;
