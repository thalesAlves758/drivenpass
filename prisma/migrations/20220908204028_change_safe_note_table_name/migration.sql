/*
  Warnings:

  - You are about to drop the `Safe_Note` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Safe_Note" DROP CONSTRAINT "Safe_Note_userId_fkey";

-- DropTable
DROP TABLE "Safe_Note";

-- CreateTable
CREATE TABLE "SafeNote" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "note" VARCHAR(1000) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SafeNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SafeNote_id_title_key" ON "SafeNote"("id", "title");

-- AddForeignKey
ALTER TABLE "SafeNote" ADD CONSTRAINT "SafeNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
