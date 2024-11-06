/*
  Warnings:

  - You are about to drop the `samples` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `samples`;

-- CreateTable
CREATE TABLE `EventOrganizer` (
    `eo_id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `EventOrganizer_email_key`(`email`),
    PRIMARY KEY (`eo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Participant` (
    `participant_id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `point_balance` INTEGER NOT NULL,
    `point_exp` DATETIME(3) NOT NULL,
    `referral_code` VARCHAR(191) NULL,

    UNIQUE INDEX `Participant_email_key`(`email`),
    PRIMARY KEY (`participant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `event_id` INTEGER NOT NULL AUTO_INCREMENT,
    `eo_id` INTEGER NOT NULL,
    `event_name` VARCHAR(191) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `category_id` INTEGER NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `available_seat` INTEGER NOT NULL,
    `ticket_types` VARCHAR(191) NOT NULL,
    `thumbnails_path` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`event_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventStatistic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_id` INTEGER NOT NULL,
    `ticket_sold` INTEGER NOT NULL,
    `total_revenue` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `event_id` INTEGER NOT NULL,
    `participant_id` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `transaction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `participant_id` INTEGER NOT NULL,
    `event_id` INTEGER NOT NULL,
    `purchase_date` DATETIME(3) NOT NULL,
    `price` INTEGER NOT NULL,

    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_eo_id_fkey` FOREIGN KEY (`eo_id`) REFERENCES `EventOrganizer`(`eo_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `EventCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventStatistic` ADD CONSTRAINT `EventStatistic_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`event_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`event_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_participant_id_fkey` FOREIGN KEY (`participant_id`) REFERENCES `Participant`(`participant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_participant_id_fkey` FOREIGN KEY (`participant_id`) REFERENCES `Participant`(`participant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`event_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
