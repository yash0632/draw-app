/*
  Warnings:

  - You are about to drop the column `roomId` on the `Rooms` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Rooms` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Rooms_roomId_key";

-- AlterTable
ALTER TABLE "Rooms" DROP COLUMN "roomId";

-- CreateIndex
CREATE UNIQUE INDEX "Rooms_id_key" ON "Rooms"("id");
