/*
  Warnings:

  - A unique constraint covering the columns `[tag,userId]` on the table `Credential` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Credential_id_tag_key";

-- CreateIndex
CREATE UNIQUE INDEX "Credential_tag_userId_key" ON "Credential"("tag", "userId");
