-- AlterEnum
ALTER TYPE "NotificationSourceType" ADD VALUE 'REALM';

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "RealmSourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Realm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
