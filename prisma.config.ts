import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  earlyAccess: true,
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL || "file:./prisma/dev.db",
  },
  migrate: {
    async adapter() {
      const { PrismaBetterSqlite3 } = await import(
        "@prisma/adapter-better-sqlite3"
      );
      return new PrismaBetterSqlite3({
        url: process.env.DATABASE_URL || "file:./prisma/dev.db",
      });
    },
  },
});
