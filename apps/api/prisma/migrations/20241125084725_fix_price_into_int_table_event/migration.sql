/*
  Warnings:

  - You are about to alter the column `price` on the `events` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.
  - You are about to drop the column `referralCode` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[referral_code]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `users_referralCode_key` ON `users`;

-- AlterTable
ALTER TABLE `events` MODIFY `price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `referralCode`,
    ADD COLUMN `referral_code` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_referral_code_key` ON `users`(`referral_code`);
