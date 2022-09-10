/*
  Warnings:

  - A unique constraint covering the columns `[tag,userId]` on the table `Card` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Card_id_tag_key";

-- CreateIndex
CREATE UNIQUE INDEX "Card_tag_userId_key" ON "Card"("tag", "userId");
