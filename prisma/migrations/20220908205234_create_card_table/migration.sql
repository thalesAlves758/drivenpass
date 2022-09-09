-- CreateEnum
CREATE TYPE "Type" AS ENUM ('CREDIT', 'DEBIT', 'BOTH');

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "tag" VARCHAR(50) NOT NULL,
    "number" VARCHAR(16) NOT NULL,
    "cardholderName" VARCHAR(35) NOT NULL,
    "securityCode" CHAR(3) NOT NULL,
    "password" VARCHAR(6) NOT NULL,
    "virtual" BOOLEAN NOT NULL DEFAULT false,
    "type" "Type" NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_id_tag_key" ON "Card"("id", "tag");
