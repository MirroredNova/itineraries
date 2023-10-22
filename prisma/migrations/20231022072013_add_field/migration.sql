/*
  Warnings:

  - Added the required column `searchString` to the `Airport` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Airport" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "iata" TEXT NOT NULL,
    "lat" DECIMAL NOT NULL,
    "long" DECIMAL NOT NULL,
    "links" INTEGER NOT NULL,
    "searchString" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Airport" ("city", "country", "iata", "id", "lat", "links", "long", "name") SELECT "city", "country", "iata", "id", "lat", "links", "long", "name" FROM "Airport";
DROP TABLE "Airport";
ALTER TABLE "new_Airport" RENAME TO "Airport";
CREATE UNIQUE INDEX "Airport_iata_key" ON "Airport"("iata");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
