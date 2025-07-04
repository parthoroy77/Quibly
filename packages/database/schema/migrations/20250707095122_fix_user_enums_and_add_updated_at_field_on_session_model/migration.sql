/*
  Warnings:

  - The values [educator,learner] on the enum `UserStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `updatedAt` to the `Sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'admin';

-- AlterEnum
BEGIN;
CREATE TYPE "UserStatus_new" AS ENUM ('active', 'inactive', 'restricted');
ALTER TABLE "Users" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Users" DROP COLUMN "password";
ALTER TABLE "Users" ALTER COLUMN "status" TYPE "UserStatus_new" USING ("status"::text::"UserStatus_new");
ALTER TYPE "UserStatus" RENAME TO "UserStatus_old";
ALTER TYPE "UserStatus_new" RENAME TO "UserStatus";
DROP TYPE "UserStatus_old";
ALTER TABLE "Users" ALTER COLUMN "status" SET DEFAULT 'inactive';
COMMIT;

-- AlterTable
ALTER TABLE "Sessions" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "role" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'inactive';
