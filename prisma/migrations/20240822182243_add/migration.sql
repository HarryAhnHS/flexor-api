/*
  Warnings:

  - Added the required column `realmId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "realmId" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "text" DROP NOT NULL;

-- CreateTable
CREATE TABLE "JoinRealm" (
    "joinerId" TEXT NOT NULL,
    "realmId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JoinRealm_pkey" PRIMARY KEY ("joinerId","realmId")
);

-- CreateTable
CREATE TABLE "Realm" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photo" TEXT,
    "authorId" TEXT,

    CONSTRAINT "Realm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Realm_name_key" ON "Realm"("name");

-- CreateIndex
CREATE INDEX "Post_realmId_idx" ON "Post"("realmId");

-- AddForeignKey
ALTER TABLE "JoinRealm" ADD CONSTRAINT "JoinRealm_joinerId_fkey" FOREIGN KEY ("joinerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinRealm" ADD CONSTRAINT "JoinRealm_realmId_fkey" FOREIGN KEY ("realmId") REFERENCES "Realm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Realm" ADD CONSTRAINT "Realm_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_realmId_fkey" FOREIGN KEY ("realmId") REFERENCES "Realm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
