/*
  Warnings:

  - The primary key for the `Airport` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Airport` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Airport" (
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "iata" TEXT NOT NULL PRIMARY KEY,
    "lat" DECIMAL NOT NULL,
    "long" DECIMAL NOT NULL,
    "links" INTEGER NOT NULL,
    "searchString" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Airport" ("city", "country", "createdAt", "iata", "lat", "links", "long", "name", "searchString") SELECT "city", "country", "createdAt", "iata", "lat", "links", "long", "name", "searchString" FROM "Airport";
DROP TABLE "Airport";
ALTER TABLE "new_Airport" RENAME TO "Airport";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
