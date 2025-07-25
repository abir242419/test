import express from "express";
import path from "path";
import cors from "cors";
import session from "express-session";
import { createApp } from "./routes";
import { MemStorage } from "./storage";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: "*", methods: "GET,POST", credentials: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === "production" }
}));

const storage = new MemStorage();
createApp(app, storage);

if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(__dirname, "../client/dist");
  app.use(express.static(clientPath));
  app.get("*", (_, res) => res.sendFile(path.join(clientPath, "index.html")));
}

app.listen(port, () => console.log(`Server running on port ${port}`));
