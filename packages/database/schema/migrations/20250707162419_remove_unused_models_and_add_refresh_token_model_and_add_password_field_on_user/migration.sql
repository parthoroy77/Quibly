/*
  Warnings:

  - You are about to drop the column `password` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `ipAddress` on the `Sessions` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `Sessions` table. All the data in the column will be lost.
  - You are about to drop the `Verifications` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Accounts" DROP COLUMN "password";

-- AlterTable
ALTER TABLE "Sessions" DROP COLUMN "ipAddress",
DROP COLUMN "userAgent";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "password" TEXT;

-- DropTable
DROP TABLE "Verifications";

-- CreateTable
CREATE TABLE "RefreshTokens" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefreshTokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshTokens_token_key" ON "RefreshTokens"("token");

-- CreateIndex
CREATE INDEX "RefreshTokens_userId_token_expiresAt_idx" ON "RefreshTokens"("userId", "token", "expiresAt");

-- AddForeignKey
ALTER TABLE "RefreshTokens" ADD CONSTRAINT "RefreshTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
