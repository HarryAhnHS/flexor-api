/*
  Warnings:

  - You are about to drop the column `authorId` on the `Realm` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Realm" DROP CONSTRAINT "Realm_authorId_fkey";

-- AlterTable
ALTER TABLE "Realm" DROP COLUMN "authorId",
ADD COLUMN     "creatorId" TEXT;

-- AddForeignKey
ALTER TABLE "Realm" ADD CONSTRAINT "Realm_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
