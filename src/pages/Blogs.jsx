import React, { useEffect } from "react";
import BlogCard from "../components/BlogCard";
import PageTop from "../components/PageTop";
import Loader from "../components/Loader";
import { database } from "../appwrite/appwriteConfig";
import { Query } from "appwrite";

const Blogs = () => {
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const blog_id = import.meta.env.VITE_BLOGS_COLLECTION_ID;
  const db_id = import.meta.env.VITE_DATABASE_ID;

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    try {
      const res = await database.listDocuments(db_id, blog_id, [
        Query.limit(8),
      ]);
      if (res?.documents?.length > 0) {
        setLoading(false);
        setBlogs(res.documents);
      }
    } catch (error) {}
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
