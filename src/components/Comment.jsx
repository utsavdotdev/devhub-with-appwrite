import {
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@pankod/refine-mui";
import React from "react";
import { toast } from "react-hot-toast";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdDelete, MdVerified } from "react-icons/md";
import styles from "../css/components/Comment.module.css";

const Comment = ({ data }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const token = localStorage.getItem("token");
  const open = Boolean(anchorEl);
  // short array with latest timestam
  const sortedComments = data.comments.sort((a, b) => {
    return b.timestamp - a.timestamp;
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (id) => {
    
  };

  return (
    <>
      {sortedComments.map((comment, i) => {
        const {
          _id,
          name,
          userid,
          avatar,
          content,
          timestamp,
          actual_date,
          verified,
        } = comment;
        return (
          <div className={styles.comment_container} key={_id}>
            <div className={styles.left}>
              <Avatar
                src={avatar}
                sx={{
                  width: "45px",
                  height: "45px",
                }}
              />
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
                <span className={styles.time}>{actual_date}</span>
              </div>
              <div className={styles.comment_text}>{content}</div>
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
              <MenuItem onClick={() => handleDelete(_id)}>
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
