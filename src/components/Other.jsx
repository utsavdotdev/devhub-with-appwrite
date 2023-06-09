import React, { useEffect } from "react";
import styles from "../css/components/Other.module.css";
import SearchBox from "./SearchBox";
import { useLocation } from "react-router-dom";
import { database } from "../appwrite/appwriteConfig";
import { Query } from "appwrite";

const Other = () => {
  const location = useLocation();
  const path = location.pathname;
  const [search, setSearch] = React.useState("");
  const [trends, setTrends] = React.useState([]);
  const db_id = import.meta.env.VITE_DATABASE_ID;
  const devit_id = import.meta.env.VITE_DEVIT_COLLECTION_ID;

  useEffect(() => {
    getTrends();
  }, []);

  const getTrends = async () => {
    try {
      const res = await database.listDocuments(db_id, devit_id);
      if (res) {
        let topTrends = [];
        res?.documents?.map((data) => {
          //check the content contains hashtag or not
          if (data.content.includes("#")) {
            const content = data.content.split(" ");
            content.map((word) => {
              //check the word contains hashtag or not and find top #hashtag and push to array and at last set the state
              if (word.includes("#")) {
                const hashtag = word.replace("#", "");
                const find = topTrends.find((trend) => trend.trend === hashtag);
                if (find) {
                  find.count = find.count + 1;
                } else {
                  topTrends.push({
                    trend: "#" + hashtag,
                    count: 1,
                  });
                }
              }
            });
          }
        });
        setTrends({
          topTrends: topTrends.sort((a, b) => b.count - a.count).slice(0, 5),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = () => {
    if (search === "") return;
    window.location.href = `/discover/?q=${search}`;
  };

  return (
    <>
      <div className={styles.other_container}>
        {path !== "/discover" && (
          <SearchBox
            handleSearch={handleSearch}
            search={search}
            setSearch={setSearch}
          />
        )}
        <div className={styles.trends_container}>
          <span className={styles.trend_title}>Trends for you</span>
          {trends.topTrends?.length > 0 ? (
            trends.topTrends?.map((trend) => (
              <div className={styles.trend}>
                <span className={styles.trend_name}>{trend.trend}</span>
                <span className={styles.trend_count}>{trend.count} devits</span>
              </div>
            ))
          ) : (
            <span className={styles.no_content}>No Trends yet</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Other;
