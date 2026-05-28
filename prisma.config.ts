import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL || "file:./prisma/dev.db",
  },
  // @ts-ignore: migrate is currently experimental/untyped in this version
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
