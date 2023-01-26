-- AlterTable
ALTER TABLE `author` ADD COLUMN `birthdate` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `book` ADD COLUMN `isbn` VARCHAR(191) NULL;
