-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "randomizeOrder" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "required" BOOLEAN NOT NULL DEFAULT true;
