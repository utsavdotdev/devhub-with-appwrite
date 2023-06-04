import React, { useContext, useEffect } from "react";
import Devit from "../components/Devit";
import PageTop from "../components/PageTop";
import Post from "../components/Post";
import { ContextProvider } from "../config/Context";
import styles from "../css/pages/Home.module.css";

const Home = () => {
  const { devits } = useContext(ContextProvider);
  const [alldevits, setAllDevits] = devits;

  // randomly sort the devits in array
  // useEffect(() => {
  //   alldevits.sort(() => Math.random() - 0.5);
  // }, []);

  return (
    <>
      <PageTop label="Home" />
      <div className={styles.home_container}>
        <Devit />
        {alldevits.map((data, i) => {
          return <Post data={data} key={i} />;
        })}
      </div>
    </>
  );
};

export default Home;
