/*
  Warnings:

  - Added the required column `sourceType` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NotificationSourceType" AS ENUM ('POST', 'COMMENT');

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sourceType" "NotificationSourceType" NOT NULL;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "PostSourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "CommentSourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
