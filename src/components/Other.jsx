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
          if (data.content.includes("#")) {
            const content = data.content.split(" ");
            content.map((word) => {
              if (word.includes("#")) {
                const hashtag = word.replace("#", "");
                const index = topTrends.findIndex(
                  (trend) => trend.trend === hashtag
                );
                if (index === -1) {
                  topTrends.push({ trend: hashtag, count: 1 });
                }
                if (index !== -1) {
                  topTrends[index].count += 1;
                }
                return;
              }
            });
          }
        });
        setTrends(topTrends.sort((a, b) => b.count - a.count));
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
          {trends?.length > 0 ? (
            trends?.map((trend) => (
              <div className={styles.trend}>
                <span className={styles.trend_name}>{"#" + trend.trend}</span>
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
