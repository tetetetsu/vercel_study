-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "mail" VARCHAR(255) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
