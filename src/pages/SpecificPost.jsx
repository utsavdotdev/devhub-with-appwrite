import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../css/pages/SpecificPost.module.css";
import { Avatar, Button, IconButton, InputBase } from "@pankod/refine-mui";
import { BiArrowBack } from "react-icons/bi";
import Post from "../components/Post";
import Comment from "../components/Comment";
import { ContextProvider } from "../config/Context";
import moment from "moment";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
const SpecificPost = () => {
  const { userDetails } = useContext(ContextProvider);
  const [user, setuser] = userDetails;

  const { id } = useParams();
  const [comment, setComment] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({});
  const [trigger, settrigger] = useState(false);

  useEffect(() => {
    fetchDevit();
  }, [trigger, id]);

  const fetchDevit = async () => {
   
  };
  if (loading) return <Loader height="80vh" />;

  const GoBack = () => {
    window.history.back();
  };

  // create a comment
  const createComment = async () => {
    
  };

  return (
    <>
      <div className={styles.specificpost_container}>
        <div className={styles.header_post}>
          <IconButton
            sx={{
              width: "38px",
              height: "38px",
            }}
            onClick={GoBack}
          >
            <BiArrowBack />
          </IconButton>
          <span className={styles.heading}>Devit</span>
        </div>
        <Post data={data} />
        <div className={styles.post_comment}>
          <Avatar
            src={user?.avatar}
            sx={{
              width: "45px",
              height: "45px",
            }}
          />
          <InputBase
            sx={{
              flex: 1,
              fontSize: "16px",
              fontFamily: "Poppins",
              color: "text.normal",
              // style the placeholder
              "& .MuiInputBase-input::placeholder": {
                color: "text.light",
                opacity: 1,
                fontSize: "1rem",
                // fontWeight: "500",
                fontFamily: "Poppins",
              },
            }}
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            multiline
          />

          <Button
            onClick={createComment}
            variant="contained"
            sx={{
              width: "80px",
              height: "38px",
              fontSize: "16px",
              fontWeight: "600",
              fontFamily: "Poppins",
              color: "text.normal",
              textTransform: "capitalize",
              borderRadius: "100vw",
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.main",
              },
            }}
            disabled={comment === "" ? true : false}
          >
            Reply
          </Button>
        </div>
        <Comment data={data} />
      </div>
    </>
  );
};

export default SpecificPost;
