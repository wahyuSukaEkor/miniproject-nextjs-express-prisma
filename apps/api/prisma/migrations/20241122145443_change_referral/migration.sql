/*
  Warnings:

  - You are about to drop the column `referral_code` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[referralCode]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `users_referral_code_key` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `referral_code`,
    ADD COLUMN `referralCode` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_referralCode_key` ON `users`(`referralCode`);
