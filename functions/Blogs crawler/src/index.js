// import { Client, Account, Databases } from "node-appwrite";
// import axios from "axios";
// import moment from "moment";
// import {} from "dotenv/config";
// import { v4 as uuidv4 } from "uuid";
// import { Query } from "appwrite";
//change the above code to common js
const { Client, Account, Databases, Query } = require("node-appwrite");
const axios = require("axios");
const moment = require("moment");
require("dotenv/config");
const { v4: uuidv4 } = require("uuid");



//Initialize the client SDK
const client = new Client();

client.setEndpoint(process.env.APPWRITE_ENDPOINT); // API Endpoint
client.setProject(process.env.APPWRITE_PROJECT_ID); // Project ID
client.setKey(process.env.APPWRITE_API_KEY); // API Key for the project

//Initialize the account
const account = new Account(client);

//Initialize the database
const database = new Databases(client, process.env.APPWRITE_DATABASE_ID);

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
      [
        Query.equal("id", blogData.id),
      ]
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
        blogData,
      );
      console.log("Blog saved:", doc.$id);
    } catch (error) {
      console.log("Failed to save Blog:", error);
    }
  }
};

// Main function to fetch blogs from Hashnode and save to Appwrite
const fetchAndSaveBlogs = async () => {
  try {
    const blogs = await fetchBlogs();
    await SaveBlogsToDB(blogs);
    console.log("Blogs saved successfully!");
  } catch (error) {
    console.error("Failed to fetch and save blogs:", error);
  }
};

// Call the main function
fetchAndSaveBlogs();
