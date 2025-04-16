/*
  Warnings:

  - A unique constraint covering the columns `[roomId]` on the table `Rooms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomId` to the `Rooms` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Rooms_roomName_key";

-- AlterTable
ALTER TABLE "Rooms" ADD COLUMN     "roomId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Rooms_roomId_key" ON "Rooms"("roomId");
