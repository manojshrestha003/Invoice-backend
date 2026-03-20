-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ALTER COLUMN "password" DROP NOT NULL;
