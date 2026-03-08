import * as t from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { timestamps } from "./helper";

const usersTable = pgTable("users", {
  id: t.uuid().primaryKey().unique(),
  username: t.varchar({ length: 16 }).unique().notNull(),
  email: t.varchar({ length: 32 }).unique(),
  password: t.varchar({ length: 18 }).notNull(),
  profileImage: t.text("profile_image"),
  ...timestamps,
});

export default usersTable;
