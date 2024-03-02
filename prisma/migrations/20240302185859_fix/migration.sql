/*
  Warnings:

  - Added the required column `url` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryID" TEXT NOT NULL,
    "fromID" TEXT NOT NULL,
    CONSTRAINT "Video_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Video_fromID_fkey" FOREIGN KEY ("fromID") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Video" ("categoryID", "description", "fromID", "id", "name") SELECT "categoryID", "description", "fromID", "id", "name" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
