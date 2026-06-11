import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";

import { clerkMiddleware } from "@clerk/express";
import { clerkWebhookHandler } from "./webhooks/clerk";

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN ?? "http://localhost:5173",
}));
app.use(clerkMiddleware());

console.log("Public path:", path.join(__dirname, "../public"));

app.use(express.static(path.join(__dirname, "../public")));

const rawJson = express.raw({ type: "application/json", limit: "1mb" });

app.post("/webhooks/clerk", rawJson, (req, res) => {
  void clerkWebhookHandler(req, res);
});

app.get('/{*splat}', (_, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log("listening on port:", PORT));