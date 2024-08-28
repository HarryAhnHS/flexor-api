-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_realmId_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "realmId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_realmId_fkey" FOREIGN KEY ("realmId") REFERENCES "Realm"("id") ON DELETE SET NULL ON UPDATE CASCADE;
