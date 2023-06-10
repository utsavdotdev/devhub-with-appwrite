import { duration } from "@pankod/refine-mui";
import React, { useEffect, useState } from "react";
import HackathonCard from "../components/HackathonCard";
import Loader from "../components/Loader";
import PageTop from "../components/PageTop";
import { database } from "../appwrite/appwriteConfig";

const Hackathons = () => {
  const [hackathons, setHackathons] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const db_id = import.meta.env.VITE_DATABASE_ID;
  const hacks_id = import.meta.env.VITE_HACKS_COLLECTION_ID;

  useEffect(() => {
    getHackathons();
  }, []);

  // bot/hacks/all
  const getHackathons = async (page) => {
    try {
      const res = await database.listDocuments(db_id, hacks_id);
      if(res)
      {
        setHackathons(res.documents);
        setLoading(false);
      }
      
    } catch (error) {
      console.log(error);
    }
    
  };

  function handleScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;
    if (scrollY + windowHeight >= bodyHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  }
  window.addEventListener("touchmove", handleScroll);

  return (
    <>
      <PageTop label="Hackathons" />
      {loading ? (
        <Loader height="80vh" />
      ) : hackathons?.length > 0 ? (
        hackathons.map((hackathon) => (
          <HackathonCard key={hackathon._id} hackathon={hackathon} />
        ))
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            width: "100%",
            fontSize: "1.2rem",
            fontWeight: "500",
            color: "#fff",
          }}
        >
          No Hackathons Found
        </div>
      )}
    </>
  );
};

export default Hackathons;
