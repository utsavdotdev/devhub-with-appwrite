const { Client, Account, Databases, Query } = require("node-appwrite");
const axios = require("axios");
const moment = require("moment");
require("dotenv/config");
const { v4: uuidv4 } = require("uuid");
const fetch = require("node-fetch");

//Function to fetch blogs
const fetchBlogs = async () => {
  const response = await axios.get(
    `https://hashnode.com/api/feed/featured?page=1`
  );

  const filteredResponse = response.data.posts.filter(
    (post) => post.coverImage !== ""
  );

  return filteredResponse;
};

//Make Url
const makeUrl = (author, slug) => {
  if (!author.publicationDomain) {
    return `https://${author.username}.hashnode.dev/${slug}`;
  }
  return `https://${author.publicationDomain}/${slug}`;
};

const SaveBlogsToDB = async (blogs) => {
  for (const blog of blogs) {
    const blogData = {
      id: blog?._id,
      title: blog?.title,
      image: blog?.coverImage,
      date: new Date(blog?.dateAdded).toDateString(),
      read_time: blog?.readTime,
      source: "hashnode",
      createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
      user_name: blog?.author?.name,
      user_image: blog?.author?.photo,
      url: makeUrl(blog?.author, blog?.slug),
      timestamp: Date.now(),
    };

    //filter out blogs that are already saved
    const blogExists = await database.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_BLOGS_COLLECTION_ID,
      [Query.equal("id", blogData.id)]
    );

    if (blogExists.documents.length > 0) {
      console.log("Blog already exists:", blogData.id);
      continue;
    }

    try {
      const doc = await database.createDocument(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_BLOGS_COLLECTION_ID,
        uuidv4(),
        blogData
      );
    } catch (error) {
      console.log("Failed to save Blog:", error);
    }
  }
};

module.exports = async function (req, res) {
  //Initialize the client SDK
  const client = new Client();

  client.setEndpoint(req.variables.APPWRITE_ENDPOINT); // API Endpoint
  client.setProject(req.variables.APPWRITE_PROJECT_ID); // Project ID
  client.setKey(req.variables.APPWRITE_API_KEY); // API Key for the project

  //Initialize the account
  const account = new Account(client);

  //Initialize the database
  const database = new Databases(client, req.variables.APPWRITE_DATABASE_ID);

  try {
    const blogs = await fetch(`https://hashnode.com/api/feed/featured?page=1`);
    const response = await blogs.json();
    const filteredResponse = response.posts.filter(
      (post) => post.coverImage !== ""
    );

    if (filteredResponse.length === 0) {
      return res.json({
        message: "No new blogs found",
      });
    }
    for (const blog of filteredResponse) {
      const blogData = {
        id: blog?._id,
        title: blog?.title,
        image: blog?.coverImage,
        date: new Date(blog?.dateAdded).toDateString(),
        read_time: blog?.readTime,
        source: "hashnode",
        createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
        user_name: blog?.author?.name,
        user_image: blog?.author?.photo,
        url: !blog?.author?.publicationDomain
          ? `https://${blog?.author?.username}.hashnode.dev/${blog?.slug}`
          : `https://${blog?.author?.publicationDomain}/${blog?.slug}`,
        timestamp: Date.now(),
      };

      //filter out blogs that are already saved
      const blogExists = await database.listDocuments(
        req.variables.APPWRITE_DATABASE_ID,
        req.variables.APPWRITE_BLOGS_COLLECTION_ID,
        [Query.equal("id", blogData.id)]
      );

      if (blogExists?.documents?.length == 0) {
        const doc = await database.createDocument(
          req.variables.APPWRITE_DATABASE_ID,
          req.variables.APPWRITE_BLOGS_COLLECTION_ID,
          uuidv4(),
          blogData
        );
        res.json({
          message: "Blogs saved successfully:" + " " + doc.$id,
        });
      }
    }
    res.json({
      message: "Action completed successfully",
    });
  } catch (error) {
    console.log("Failed to fetch and save blogs:", error);
    res.json({
      message: "Failed to fetch and save blogs",
      error: error.toString(),
    });
  }
};
