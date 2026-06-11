"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.uuid)("id").defaultRandom().primaryKey(),
    clerkUserId: (0, pg_core_1.text)("clerk_user_id").notNull().unique(),
    email: (0, pg_core_1.text)("email").notNull().default(""),
    displayName: (0, pg_core_1.text)("display_name"),
    role: (0, pg_core_1.text)("role").$type().notNull().default("customer"),
    createdAt: (0, pg_core_1.timestamp)("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
