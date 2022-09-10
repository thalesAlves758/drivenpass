/*
  Warnings:

  - A unique constraint covering the columns `[title,userId]` on the table `SafeNote` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "SafeNote_id_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "SafeNote_title_userId_key" ON "SafeNote"("title", "userId");
