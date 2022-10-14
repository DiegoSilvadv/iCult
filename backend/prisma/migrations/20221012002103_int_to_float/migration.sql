/*
  Warnings:

  - You are about to alter the column `latitude` on the `Locations` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `longitude` on the `Locations` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Locations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventName" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "hourStart" INTEGER NOT NULL,
    "hourEnd" INTEGER NOT NULL,
    "longitude" REAL NOT NULL,
    "latitude" REAL NOT NULL
);
INSERT INTO "new_Locations" ("eventName", "eventType", "hourEnd", "hourStart", "id", "latitude", "longitude") SELECT "eventName", "eventType", "hourEnd", "hourStart", "id", "latitude", "longitude" FROM "Locations";
DROP TABLE "Locations";
ALTER TABLE "new_Locations" RENAME TO "Locations";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
