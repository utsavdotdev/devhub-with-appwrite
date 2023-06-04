import { Client, Account, Databases } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Api Endpoint
  .setProject("645e01c1c2b3de057a27"); // Project ID

export const account = new Account(client);
export const database = new Databases(client, "646adbeedd493bdf0e7b");
