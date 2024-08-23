/*
  Warnings:

  - You are about to drop the column `photo` on the `Realm` table. All the data in the column will be lost.
  - You are about to drop the column `profilePictureId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Realm" DROP COLUMN "photo",
ADD COLUMN     "realmPicturePublicId" TEXT,
ADD COLUMN     "realmPictureUrl" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profilePictureId",
ADD COLUMN     "profilePicturePublicId" TEXT;
