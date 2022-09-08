-- CreateTable
CREATE TABLE "Credential" (
    "id" SERIAL NOT NULL,
    "tag" VARCHAR(50) NOT NULL,
    "url" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Credential_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Credential_id_tag_key" ON "Credential"("id", "tag");
