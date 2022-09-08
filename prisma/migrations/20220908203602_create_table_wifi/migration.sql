-- CreateTable
CREATE TABLE "WiFi" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "password" TEXT NOT NULL,
    "tag" VARCHAR(30) NOT NULL,

    CONSTRAINT "WiFi_pkey" PRIMARY KEY ("id")
);
