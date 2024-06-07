/*
  Warnings:

  - The values [BOUGHT] on the enum `ProductItem_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `productitem` MODIFY `status` ENUM('ON_STOCK', 'AVAILABLE', 'SOLD') NOT NULL DEFAULT 'ON_STOCK';
