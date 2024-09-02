-- DropIndex
DROP INDEX "Post_realmId_idx";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "title" DROP NOT NULL;
