import { IconButton, ListItemIcon, Menu, MenuItem } from "@pankod/refine-mui";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdDelete, MdVerified } from "react-icons/md";
import styles from "../css/components/Comment.module.css";
import Avatar, { genConfig } from "react-nice-avatar";
import { database } from "../appwrite/appwriteConfig";

const Comment = ({ data }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const token = localStorage.getItem("token");
  const [comments, setComments] = React.useState([]);
  const open = Boolean(anchorEl);

  const db_id = import.meta.env.VITE_DATABASE_ID;
  const devit_id = import.meta.env.VITE_DEVIT_COLLECTION_ID;

  useEffect(() => {
    parsingComments();
  }, []);

  const parsingComments = () => {
    const comment = data?.comments;
    const parsedComments = comment.map((comment) => {
      return JSON.parse(comment);
    });
    setComments(parsedComments);
  };
  // short array with latest timestam
  const sortedComments = comments.sort((a, b) => {
    return b.timestamp - a.timestamp;
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (id) => {
    try {
      let comments = data?.comments;
      const filteredComments = comments.filter((comment) => {
        const parsedComment = JSON.parse(comment);
        return parsedComment.userid !== id;
      });
      const res = await database.updateDocument(db_id, devit_id, data?.$id, {
        comments: filteredComments,
      });
      if (res) {
        toast.success("Comment deleted successfully");
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {sortedComments.map((comm, i) => {
        const { name, userid, avatar, comment, timestamp, time, verified } =
          comm;
        const config = genConfig(avatar);
        return (
          <div className={styles.comment_container} key={userid}>
            <div className={styles.left}>
              <Avatar style={{ width: "45px", height: "45px" }} {...config} />
            </div>
            <div className={styles.right}>
              <div className={styles.info}>
                <span className={styles.info_name}>{name}</span>
                {verified && (
                  <span className={styles.green_tick}>
                    <MdVerified />
                  </span>
                )}
                <span className={styles.dot}></span>
                <span className={styles.time}>{time}</span>
              </div>
              <div className={styles.comment_text}>{comment}</div>
            </div>
            {/* {token === userid && ( */}
            <IconButton
              sx={{
                width: "30px",
                height: "30px",
                color: "text.light",
                position: "absolute",
                right: "5px",
                top: "5px",
                //make the primary hover color
                "&:hover": {
                  color: "primary.main",
                  //transparent green background
                  backgroundColor: "rgba(29,161,242,0.1)",
                },
              }}
              onClick={handleClick}
            >
              <FiMoreHorizontal />
            </IconButton>
            {/* )} */}
            <Menu
              id="devit-menu"
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  backgroundColor: "background.default",
                  color: "text.primary",
                  width: "85px",
                  padding: "0px",
                  //remove top bottom padding
                  "& .MuiMenu-list": {
                    padding: "0px",
                  },
                },
              }}
              //style the menu items
              MenuListProps={{
                sx: {
                  "& .MuiMenuItem-root": {
                    padding: "6px 8px",
                    fontSize: "14px",
                    fontFamily: "Poppins",
                    "&:hover": {
                      backgroundColor: "rgba(29,161,242,0.1)",
                    },
                  },
                },
              }}
            >
              <MenuItem onClick={() => handleDelete(userid)}>
                <ListItemIcon
                  style={{
                    minWidth: "0px",
                    marginRight: "6px",
                    fontSize: "16px",
                  }}
                >
                  <MdDelete />
                </ListItemIcon>
                Delete
              </MenuItem>
            </Menu>
          </div>
        );
      })}
    </>
  );
};

export default Comment;
