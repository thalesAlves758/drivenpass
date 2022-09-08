-- CreateTable
CREATE TABLE "Safe_Note" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "note" VARCHAR(1000) NOT NULL,

    CONSTRAINT "Safe_Note_pkey" PRIMARY KEY ("id")
);
