import { Avatar, Badge } from "@pankod/refine-mui";
import React, { useEffect, useContext } from "react";
import SearchBox from "../components/SearchBox";
import styles from "../css/pages/Discover.module.css";
import Post from "../components/Post";
import Loader from "../components/Loader";
import { MdVerified, MdDelete } from "react-icons/md";
import { ContextProvider } from "../config/Context";
import { toast } from "react-hot-toast";

const Discover = () => {
  const [search, setSearch] = React.useState("");
  const user = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [loading, setLoading] = React.useState(false);
  const [alldevits, setAllDevits] = React.useState([]);
  const [srhDevits, setSrhDevits] = React.useState([]);
  const [userLoading, setUserLoading] = React.useState(true);
  const [count, setCount] = React.useState(0);

  //get the search query
  const query = new URLSearchParams(window.location.search);
  const q = query.get("q");

  useEffect(() => {
    getAllDevits();
  }, []);

  const getAllDevits = async () => {
    
  };
  useEffect(() => {
    if (srhDevits.length === 0) {
      setSearch("");
    }
  }, [srhDevits]);

  useEffect(() => {
    if (q) {
      setSearch(q);
    }
  }, [q]);

  const [allUser, setallUser] = React.useState([]);

  useEffect(() => {
    const fetchallUser = async () => {
      
    };

    fetchallUser();
  }, []);

  const handleSearch = async () => {
    if (search === "") return;
    
  };

  const deleteUser = async (id, name) => {
    
  };

  return (
    <>
      <div className={styles.search_wrapper}>
        <SearchBox
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
        />
      </div>
      <div className={styles.user_list}>
        {userLoading ? (
          <Loader height="100px" size={30} />
        ) : (
          allUser.map((user) => (
            <div
              className={styles.user}
              onClick={() => deleteUser(user?._id, user?.firstname)}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  user.verified && (
                    <span className={styles.green_tick}>
                      <MdVerified />
                    </span>
                  )
                }
              >
                <Avatar
                  src={user.avatar}
                  sx={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    border: "2px solid var(--primary)",
                  }}
                />
              </Badge>
              <span className={styles.user_info}>{user.firstname}</span>
            </div>
          ))
        )}
      </div>
      {search !== "" ? (
        loading ? (
          <Loader height="50vh" />
        ) : srhDevits?.length > 0 ? (
          srhDevits?.map((data) => <Post key={data._id} data={data} />)
        ) : (
          <span className={styles.no_content}>Typing . . .</span>
        )
      ) : alldevits.length > 0 ? (
        alldevits.map((data) => <Post key={data._id} data={data} />)
      ) : (
        <Loader height="50vh" />
      )}
      {/* <Loader height="50vh" /> */}
    </>
  );
};

export default Discover;
