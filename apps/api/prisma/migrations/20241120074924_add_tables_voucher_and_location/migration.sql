/*
  Warnings:

  - You are about to drop the column `location` on the `event` table. All the data in the column will be lost.
  - Added the required column `location_id` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `location`,
    ADD COLUMN `location_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `review` MODIFY `comment` TEXT NULL;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `payment_path` VARCHAR(191) NULL,
    MODIFY `point_used` INTEGER NULL;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Voucher` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `discount` INTEGER NOT NULL,
    `expiry_date` DATETIME(3) NULL,
    `max_usage` INTEGER NOT NULL,
    `usage` INTEGER NOT NULL DEFAULT 0,
    `event_id` INTEGER NULL,
    `participant_id` INTEGER NULL,
    `eo_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voucher` ADD CONSTRAINT `Voucher_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`event_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voucher` ADD CONSTRAINT `Voucher_participant_id_fkey` FOREIGN KEY (`participant_id`) REFERENCES `Participant`(`participant_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voucher` ADD CONSTRAINT `Voucher_eo_id_fkey` FOREIGN KEY (`eo_id`) REFERENCES `EventOrganizer`(`eo_id`) ON DELETE SET NULL ON UPDATE CASCADE;
