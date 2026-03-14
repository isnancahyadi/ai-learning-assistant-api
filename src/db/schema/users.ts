import * as t from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { timestamps } from "./helper";

const usersTable = pgTable("users", {
  id: t.uuid().primaryKey().unique().defaultRandom(),
  username: t.varchar({ length: 12 }).unique().notNull(),
  email: t.varchar({ length: 255 }).unique().notNull(),
  password: t.varchar({ length: 255 }).notNull(),
  profileImage: t.text("profile_image"),
  ...timestamps,
});

export default usersTable;
