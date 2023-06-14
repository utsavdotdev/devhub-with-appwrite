import { Client, Account, Databases,Storage } from "appwrite";

const project_id = import.meta.env.VITE_PROJECT_ID;
const db_id = import.meta.env.VITE_DATABASE_ID;
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Api Endpoint
  .setProject(project_id); // Project ID

export const account = new Account(client);
export const storage = new Storage(client);
export const database = new Databases(client, db_id);
