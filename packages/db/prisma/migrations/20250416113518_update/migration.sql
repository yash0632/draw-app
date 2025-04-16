/*
  Warnings:

  - Added the required column `roomMemberId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "roomMemberId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Rooms" (
    "id" SERIAL NOT NULL,
    "roomName" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Rooms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_roomMemberId_fkey" FOREIGN KEY ("roomMemberId") REFERENCES "Rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
