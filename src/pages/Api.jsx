import React, { useContext } from "react";
import ApiRevoke from "../components/ApiRevoke";
import PageTop from "../components/PageTop";
import { ContextProvider } from "../config/Context";

const Api = () => {
  const { userDetails } = useContext(ContextProvider);
  const [user, setUser] = userDetails;
  return (
    <>
      <PageTop label="Setting" />
      <ApiRevoke />
      {/* {user?.apiKey !== "" && <ApiReadme />} */}
    </>
  );
};

export default Api;
