/*
  Warnings:

  - A unique constraint covering the columns `[id,title]` on the table `Safe_Note` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Safe_Note_id_title_key" ON "Safe_Note"("id", "title");
