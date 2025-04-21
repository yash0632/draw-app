/*
  Warnings:

  - You are about to drop the column `roomMemberId` on the `Users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_roomMemberId_fkey";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "roomMemberId";
