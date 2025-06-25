/*
  Warnings:

  - You are about to drop the column `originalPrice` on the `Product` table. All the data in the column will be lost.
  - Added the required column `hasCouponApplied` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "originalPrice",
ADD COLUMN     "hasCouponApplied" BOOLEAN NOT NULL;
