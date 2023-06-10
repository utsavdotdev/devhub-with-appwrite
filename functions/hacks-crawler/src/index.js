const { Client, Account, Databases, Query } = require("node-appwrite");
const moment = require("moment");
require("dotenv/config");
const { v4: uuidv4 } = require("uuid");
const fetch = require("node-fetch");

const hacksCrawler = async () => {
  try {
    const hacks = await fetch(
      "https://devpost.com/api/hackathons?page=1&status[]=open"
    );
    const response = await hacks.json();
    const filteredResponse = response?.hackathons?.filter(
      (hack) => hack.thumbnail_url !== null
    );

    if (filteredResponse?.length === 0) {
      return console.log("No new hacks found");
    }
    filteredResponse.map(async (hack) => {
      const hackData = {
        id: hack?.id,
        title:
          hack?.title.length > 30
            ? hack?.title.substring(0, 20) + "..."
            : hack?.title,
        image: hack?.thumbnail_url,
        time_left: hack?.time_left_to_submission.replace(/^about /i, ""),
        date: hack?.submission_period_dates,
        source: hack?.organization_name.includes("svg")
          ? "Unknown"
          : hack?.organization_name,
        prize: "$ " + hack?.prize_amount.replace(/[^0-9]/g, ""),
        url: hack?.url,
        participants: hack?.registrations_count,
        timestamp: moment().unix(),
        createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
      };

      //filter out hacks that are already saved
      const hackExists = await database.listDocuments(db_id, collection_id, [
        Query.equal("id", hackData.id),
      ]);

      if (hackExists?.documents?.length === 0) {
        try {
          await database.createDocument(
            db_id,
            collection_id,
            uuidv4(),
            hackData
          );
          console.log("Saved Hack:", hackData.id);
        } catch (error) {
          console.log("Failed to save Hack:", error);
        }
      }
    });
  } catch (error) {
    console.log("Failed to fetch hacks:", error);
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
  const db_id = req.variables.APPWRITE_DATABASE_ID;
  const collection_id = req.variables.APPWRITE_HACKS_COLLECTION_ID;

  try {
    const hacks = await fetch(
      "https://devpost.com/api/hackathons?page=1&status[]=open"
    );
    const response = await hacks.json();
    const filteredResponse = response?.hackathons?.filter(
      (hack) => hack.thumbnail_url !== null
    );

    if (filteredResponse?.length === 0) {
      return console.log("No new hacks found");
    }
    for (const hack of filteredResponse) {
      const hackData = {
        id: hack?.id,
        title:
          hack?.title.length > 30
            ? hack?.title.substring(0, 20) + "..."
            : hack?.title,
        image: hack?.thumbnail_url,
        time_left: hack?.time_left_to_submission.replace(/^about /i, ""),
        date: hack?.submission_period_dates,
        source: hack?.organization_name.includes("svg")
          ? "Unknown"
          : hack?.organization_name,
        prize: "$ " + hack?.prize_amount.replace(/[^0-9]/g, ""),
        url: hack?.url,
        participants: hack?.registrations_count,
        timestamp: moment().unix(),
        createdAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
      };

      //filter out hacks that are already saved
      const hackExists = await database.listDocuments(db_id, collection_id, [
        Query.equal("id", hackData.id),
      ]);

      if (hackExists?.documents?.length === 0) {
        try {
          await database.createDocument(
            db_id,
            collection_id,
            uuidv4(),
            hackData
          );
          res.json({
            message: "Saved Hack: " + hackData.id,
          });
        } catch (error) {
          console.log("Failed to save Hack:", error);
        }
      }
    }
    res.json({
      message: "Action completed successfully",
    });
  } catch (error) {
    console.log("Failed to fetch hacks:", error);
  }
};
