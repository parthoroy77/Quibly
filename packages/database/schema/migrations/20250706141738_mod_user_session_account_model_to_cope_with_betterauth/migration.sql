/*
  Warnings:

  - You are about to drop the column `access_token` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `expires_at` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `id_token` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `providerAccountId` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `session_state` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `token_type` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Accounts` table. All the data in the column will be lost.
  - You are about to drop the column `expires` on the `Sessions` table. All the data in the column will be lost.
  - You are about to drop the column `sessionToken` on the `Sessions` table. All the data in the column will be lost.
  - The `emailVerified` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `phoneVerified` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[userId,providerId]` on the table `Accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `Sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `Accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerId` to the `Accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `Sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `Sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Accounts_provider_providerAccountId_key";

-- DropIndex
DROP INDEX "Sessions_sessionToken_idx";

-- DropIndex
DROP INDEX "Sessions_sessionToken_key";

-- AlterTable
ALTER TABLE "Accounts" DROP COLUMN "access_token",
DROP COLUMN "expires_at",
DROP COLUMN "id_token",
DROP COLUMN "provider",
DROP COLUMN "providerAccountId",
DROP COLUMN "refresh_token",
DROP COLUMN "session_state",
DROP COLUMN "token_type",
DROP COLUMN "type",
ADD COLUMN     "accessToken" TEXT,
ADD COLUMN     "accessTokenExpiresAt" TIMESTAMP(3),
ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "idToken" TEXT,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "providerId" TEXT NOT NULL,
ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "refreshTokenExpiresAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Sessions" DROP COLUMN "expires",
DROP COLUMN "sessionToken",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ipAddress" TEXT,
ADD COLUMN     "token" TEXT NOT NULL,
ADD COLUMN     "userAgent" TEXT;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "password" DROP NOT NULL,
DROP COLUMN "emailVerified",
ADD COLUMN     "emailVerified" BOOLEAN,
DROP COLUMN "phoneVerified",
ADD COLUMN     "phoneVerified" BOOLEAN;

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_userId_providerId_key" ON "Accounts"("userId", "providerId");

-- CreateIndex
CREATE UNIQUE INDEX "Sessions_token_key" ON "Sessions"("token");

-- CreateIndex
CREATE INDEX "Sessions_token_idx" ON "Sessions"("token");
