/*
  Warnings:

  - You are about to drop the column `eo_id` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `participant_id` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `participant_id` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `eo_id` on the `voucher` table. All the data in the column will be lost.
  - You are about to drop the column `participant_id` on the `voucher` table. All the data in the column will be lost.
  - You are about to drop the `eventorganizer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `participant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `organizer_id` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_eo_id_fkey`;

-- DropForeignKey
ALTER TABLE `referral` DROP FOREIGN KEY `Referral_referred_id_fkey`;

-- DropForeignKey
ALTER TABLE `referral` DROP FOREIGN KEY `Referral_referrer_id_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_participant_id_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_participant_id_fkey`;

-- DropForeignKey
ALTER TABLE `voucher` DROP FOREIGN KEY `Voucher_eo_id_fkey`;

-- DropForeignKey
ALTER TABLE `voucher` DROP FOREIGN KEY `Voucher_participant_id_fkey`;

-- AlterTable
ALTER TABLE `event` DROP COLUMN `eo_id`,
    ADD COLUMN `organizer_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `review` DROP COLUMN `participant_id`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `participant_id`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `voucher` DROP COLUMN `eo_id`,
    DROP COLUMN `participant_id`,
    ADD COLUMN `user_id` INTEGER NULL;

-- DropTable
DROP TABLE `eventorganizer`;

-- DropTable
DROP TABLE `participant`;

-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `referralCode` VARCHAR(191) NULL,
    `isAdmin` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_referralCode_key`(`referralCode`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Point` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `balance` INTEGER NOT NULL,
    `expiryDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Point_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_organizer_id_fkey` FOREIGN KEY (`organizer_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Referral` ADD CONSTRAINT `Referral_referrer_id_fkey` FOREIGN KEY (`referrer_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Referral` ADD CONSTRAINT `Referral_referred_id_fkey` FOREIGN KEY (`referred_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voucher` ADD CONSTRAINT `Voucher_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Point` ADD CONSTRAINT `Point_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
