-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SocialLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL DEFAULT '',
    "platform" TEXT NOT NULL DEFAULT '',
    "value" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SocialLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SocialLink" ("id", "platform", "userId", "value") SELECT "id", "platform", "userId", "value" FROM "SocialLink";
DROP TABLE "SocialLink";
ALTER TABLE "new_SocialLink" RENAME TO "SocialLink";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
