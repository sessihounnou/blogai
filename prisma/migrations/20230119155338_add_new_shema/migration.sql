/*
  Warnings:

  - Added the required column `image` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Article` ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` BOOLEAN NOT NULL;
