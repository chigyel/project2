/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Fixture` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Fixture` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Fixture" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "team1Score" DROP DEFAULT,
ALTER COLUMN "team2Score" DROP DEFAULT;
