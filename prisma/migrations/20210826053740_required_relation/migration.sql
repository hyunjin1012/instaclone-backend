/*
  Warnings:

  - Made the column `photoId` on table `Comment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "photoId" SET NOT NULL;
