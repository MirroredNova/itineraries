/*
  Warnings:

  - A unique constraint covering the columns `[iata]` on the table `Airport` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Airport_iata_key" ON "Airport"("iata");
