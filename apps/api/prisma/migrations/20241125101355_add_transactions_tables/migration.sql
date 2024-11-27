/*
  Warnings:

  - The primary key for the `events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `event_id` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `event_id` on the `reviews` table. All the data in the column will be lost.
  - The primary key for the `transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `event_id` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_id` on the `transactions` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `users` table. All the data in the column will be lost.
  - The primary key for the `vouchers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `event_id` on the `vouchers` table. All the data in the column will be lost.
  - You are about to drop the column `voucer_id` on the `vouchers` table. All the data in the column will be lost.
  - Added the required column `id` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `vouchers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `events` DROP FOREIGN KEY `events_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `points` DROP FOREIGN KEY `points_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_voucer_id_fkey`;

-- DropForeignKey
ALTER TABLE `vouchers` DROP FOREIGN KEY `vouchers_event_id_fkey`;

-- DropForeignKey
ALTER TABLE `vouchers` DROP FOREIGN KEY `vouchers_user_id_fkey`;

-- AlterTable
ALTER TABLE `events` DROP PRIMARY KEY,
    DROP COLUMN `event_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `reviews` DROP COLUMN `event_id`,
    ADD COLUMN `eventId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transactions` DROP PRIMARY KEY,
    DROP COLUMN `event_id`,
    DROP COLUMN `transaction_id`,
    ADD COLUMN `eventId` INTEGER NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `user_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `vouchers` DROP PRIMARY KEY,
    DROP COLUMN `event_id`,
    DROP COLUMN `voucer_id`,
    ADD COLUMN `eventId` INTEGER NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `transaction_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_id` INTEGER NOT NULL,
    `ticket_code` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `points` ADD CONSTRAINT `points_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_voucer_id_fkey` FOREIGN KEY (`voucer_id`) REFERENCES `vouchers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vouchers` ADD CONSTRAINT `vouchers_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vouchers` ADD CONSTRAINT `vouchers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_details` ADD CONSTRAINT `transaction_details_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
