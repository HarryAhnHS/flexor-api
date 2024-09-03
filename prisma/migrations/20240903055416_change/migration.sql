/*
  Warnings:

  - You are about to drop the column `sourceId` on the `Notification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "CommentSourceId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "PostSourceId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "RealmSourceId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "sourceId",
ADD COLUMN     "commentId" TEXT,
ADD COLUMN     "postId" TEXT,
ADD COLUMN     "realmId" TEXT;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_realmId_fkey" FOREIGN KEY ("realmId") REFERENCES "Realm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
