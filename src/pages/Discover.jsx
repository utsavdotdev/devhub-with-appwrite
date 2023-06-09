import { Badge } from "@pankod/refine-mui";
import React, { useEffect, useContext } from "react";
import SearchBox from "../components/SearchBox";
import styles from "../css/pages/Discover.module.css";
import Post from "../components/Post";
import Loader from "../components/Loader";
import { MdVerified, MdDelete } from "react-icons/md";
import { ContextProvider } from "../config/Context";
import { toast } from "react-hot-toast";
import { database } from "../appwrite/appwriteConfig";
import { Query } from "appwrite";
import Avatar, { genConfig } from "react-nice-avatar";

const Discover = () => {
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [alldevits, setAllDevits] = React.useState([]);
  const [srhDevits, setSrhDevits] = React.useState([]);
  const [userLoading, setUserLoading] = React.useState(true);
  const [count, setCount] = React.useState(0);

  const { userDetails } = useContext(ContextProvider);
  const [user, setuser] = userDetails;
  const [allUser, setallUser] = React.useState([]);

  //get the search query
  const query = new URLSearchParams(window.location.search);
  const q = query.get("q");

  const db_id = import.meta.env.VITE_DATABASE_ID;
  const devit_id = import.meta.env.VITE_DEVIT_COLLECTION_ID;
  const users_id = import.meta.env.VITE_USER_COLLECTION_ID;

  useEffect(() => {
    getAllDevits();
  }, []);

  const getAllDevits = async () => {
    try {
      const res = await database.listDocuments(db_id, devit_id, [
        Query.orderAsc("timestamp"),
      ]);
      if (res) {
        setAllDevits(res?.documents);
      }
    } catch {}
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

  useEffect(() => {
    const fetchallUser = async () => {
      try {
        const res = await database.listDocuments(db_id, users_id);
        if (res?.documents?.length > 0) {
          setallUser(res?.documents);
          setUserLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchallUser();
  }, []);

  const handleSearch = async () => {
    if (search === "") return;
    try {
      setLoading(true);
      const res = await database.listDocuments(db_id, devit_id, [
        Query.search("content", search),
      ]);
      if (res) {
        if (res.documents.length === 0) {
          toast.error("No devits found");
          return setLoading(false);
        }
        setSrhDevits(res.documents);
        return setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong");
    }
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
            <>
              <div className={styles.user}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    user?.verified && (
                      <span className={styles.green_tick}>
                        <MdVerified />
                      </span>
                    )
                  }
                >
                  <Avatar
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                    {...genConfig(user?.avatar)}
                  />
                </Badge>
                <span className={styles.user_info}>{user?.username}</span>
              </div>
            </>
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
