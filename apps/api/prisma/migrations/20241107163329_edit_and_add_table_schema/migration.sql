/*
  Warnings:

  - You are about to drop the column `price` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `point_updated` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `base_price` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `final_price` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `point_used` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `participant` ADD COLUMN `point_updated` DATETIME(3) NOT NULL,
    MODIFY `point_balance` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `review` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `price`,
    ADD COLUMN `base_price` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `discount_used` DECIMAL(65, 30) NULL,
    ADD COLUMN `final_price` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `point_used` INTEGER NOT NULL,
    MODIFY `purchase_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `Referral` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `referrer_id` INTEGER NOT NULL,
    `referred_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expires_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Referral` ADD CONSTRAINT `Referral_referrer_id_fkey` FOREIGN KEY (`referrer_id`) REFERENCES `Participant`(`participant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Referral` ADD CONSTRAINT `Referral_referred_id_fkey` FOREIGN KEY (`referred_id`) REFERENCES `Participant`(`participant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
