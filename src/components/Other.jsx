import React, { useEffect } from "react";
import styles from "../css/components/Other.module.css";
import SearchBox from "./SearchBox";
import { useLocation } from "react-router-dom";
const Other = () => {
  const location = useLocation();
  const path = location.pathname;
  const [search, setSearch] = React.useState("");
  const [trends, setTrends] = React.useState([]);

  // useEffect(() => {
  //   getTrends();
  // }, []);

  // const getTrends = async () => {
  //   try {
  //     const res = await provider.get("/devit/trends");
  //     if (res) {
  //       setTrends(res.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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
