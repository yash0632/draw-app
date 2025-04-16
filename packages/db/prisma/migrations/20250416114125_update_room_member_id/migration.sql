/*
  Warnings:

  - A unique constraint covering the columns `[roomName]` on the table `Rooms` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "roomMemberId" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Rooms_roomName_key" ON "Rooms"("roomName");
