-- CreateTable
CREATE TABLE "Logo" (
    "id" SERIAL NOT NULL,
    "team" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Logo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Logo_team_key" ON "Logo"("team");
