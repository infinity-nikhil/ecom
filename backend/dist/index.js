"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const express_2 = require("@clerk/express");
const clerk_1 = require("./webhooks/clerk");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.ALLOWED_ORIGIN ?? "http://localhost:5173",
}));
app.use((0, express_2.clerkMiddleware)());
console.log("Public path:", path_1.default.join(__dirname, "../public"));
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
const rawJson = express_1.default.raw({ type: "application/json", limit: "1mb" });
app.post("/webhooks/clerk", rawJson, (req, res) => {
    void (0, clerk_1.clerkWebhookHandler)(req, res);
});
app.get('*', (_, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public", "index.html"));
});
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log("listening on port:", PORT));
