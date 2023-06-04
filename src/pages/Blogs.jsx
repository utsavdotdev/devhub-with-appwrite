import React, { useEffect } from "react";
import BlogCard from "../components/BlogCard";
import PageTop from "../components/PageTop";
import Loader from "../components/Loader";

const Blogs = () => {
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    
  };
  return (
    <>
      <PageTop label="Blogs" />
      {loading ? (
        <Loader height="80vh" />
      ) : blogs?.length > 0 ? (
        blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
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
          No Blogs Found
        </div>
      )}
    </>
  );
};

export default Blogs;
